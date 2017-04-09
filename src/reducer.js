// @flow
import type {Model} from './model';
import type {Event} from './event';
import type {Reducer} from './server/ModelStorage';
import type {Update} from './update';
import type {LobbyUpdate} from './update';
import {makeGameMode} from './model';
import {makePromptMode} from './model';
import type {PromptMode} from './model';
import type {PromptUpdate, DescribeUpdate, DrawUpdate} from './update';
import {getNextPlayer} from './model';
import type {Drawing} from './drawing';
import {makeJobQueue, finishJob, addJob, getJob} from './jobQueue';

export const reducer: Reducer = function(event, clientId, model){
  if (event.data.type === "Connect"){
    model.clients.add(clientId);
  } else if (event.data.type === "Disconnect"){
    model.clients.delete(clientId);
  }



  if (model.mode.name === "LobbyMode") {
    return lobbyMode(event, clientId, model);
  } else if (model.mode.name === "PromptMode") {
    return promptMode(event, clientId, model)
  } else if (model.mode.name === "GameMode"){
    return gameMode(event, clientId, model);
  }
}

const lobbyMode: Reducer = function(event, clientId, model) {
  if (event.data.type === "SetName") {
    if (event.data.name){
      let newPlayer = {name: event.data.name, jobQueue: makeJobQueue(), clientId: clientId}
      model.players.set(clientId, newPlayer)
      return updateAll(model, makeLobbyUpdate(model))
    }
  } else if (event.data.type === "Connect"){
    // console.log("DEBUG: returning update from reducer for client " + clientId);
    return new Map([[clientId, makeLobbyUpdate(model)]])
  } else if (event.data.type === "StartGame") {
    model.mode = makePromptMode(model.players)
    return updatePlayers(model, makePromptUpdate(model));
  }
}

const promptMode: Reducer = function(event, clientId, model) {
  if (event.data.type === "Prompt") {
    let words = event.data.prompt
    if (model.mode.name === "PromptMode") {
      let lines = model.mode.lines
      let order = model.mode.playerOrder
      let currentLine = lines.get(clientId)
      if (currentLine && currentLine.line) {
        currentLine.line.push(words)
        let assignToNext = makeDrawUpdate(words)
        let nextPlayer = model.players.get(getNextPlayer(order, clientId))
        if (nextPlayer) {
          addJob(nextPlayer.jobQueue, assignToNext)
        }
        let promptsDone = true
        lines.forEach(function(line, id) {promptsDone = promptsDone && line.line[0]})
        if (promptsDone) {
          model.mode = makeGameMode(lines, order)
          let updateMap = new Map()
          model.players.forEach(function(player, id) {updateMap.set(id, getJob(player.jobQueue))})
          return updateMap
        }

      } else {
        console.log("something weird happened involving a phone line which didn't exist")
      }
    } else {
      console.log("a prompt event occurred when we weren't even in prompt mode I mean what")
    }

  }
}

function makeLobbyUpdate(model: Model): LobbyUpdate {
  let playerNames = []
  model.players.forEach(function(player, id) {playerNames.push(player.name)})
  return {name: "LobbyUpdate", players: playerNames}
}

const gameMode: Reducer = function(event, clientId, model){
  if (event.data.type === "Draw"){
    let drawing = event.data.drawing;
    if (model.mode.name === "GameMode") {
      let lines = model.mode.lines
      let order = model.mode.playerOrder
      let currentLine = lines.get(clientId)
      if (currentLine) {
        currentLine.line.push(drawing)
        let updateMap = new Map()
        let nextPlayerId = getNextPlayer(order, clientId)
        let nextPlayer = model.players.get(nextPlayerId)
        if (nextPlayer) {
          let newUpdate = makeDescribeUpdate(drawing)
          addJob(nextPlayer.jobQueue, newUpdate)
          if (nextPlayer.jobQueue.length == 0) {
            updateMap.set(nextPlayerId, newUpdate)
          }
        }
        let currentPlayer = model.players.get(clientId)
        if (currentPlayer) {
          finishJob(currentPlayer.jobQueue)
          if (currentPlayer.jobQueue.length > 0) {
            updateMap.set(clientId, getJob(currentPlayer.jobQueue))
          }
        }
        return updateMap
      } else {
        console.log("you have dialed an imaginary number. please rotate phone by 90 degrees and try again")
      }
    } else {
      console.log("a draw event occurred when we weren't in game mode")
    }

  } else if (event.data.type === "Describe"){
    let description = event.data.description;
    if (model.mode.name === "GameMode") {
      let lines = model.mode.lines
      let order = model.mode.playerOrder
      let currentLine = lines.get(clientId)
      if (currentLine) {
        currentLine.line.push(description)
        let updateMap = new Map()
        let nextPlayerId = getNextPlayer(order, clientId)
        let nextPlayer = model.players.get(nextPlayerId)
        if (nextPlayer) {
          let newUpdate = makeDrawUpdate(description)
          addJob(nextPlayer.jobQueue, newUpdate)
          if (nextPlayer.jobQueue.length == 0) {
            updateMap.set(nextPlayerId, newUpdate)
          }
        }
        let currentPlayer = model.players.get(clientId)
        if (currentPlayer) {
          finishJob(currentPlayer.jobQueue)
          if (currentPlayer.jobQueue.length > 0) {
            updateMap.set(clientId, getJob(currentPlayer.jobQueue))
          }
        }
        return updateMap
      }
    }
  }
}

function makePromptUpdate(model: Model): PromptUpdate {
  return {
    name: "PromptUpdate"
  }
}

function makeDescribeUpdate(drawing : Drawing): DescribeUpdate {
  return {
    name: "DescribeUpdate",
    drawing: drawing
  }
}

function makeDrawUpdate(description : string): DrawUpdate {
  return {
    name: "DrawUpdate",
    description: description
  }
}

function updateAll(model: Model, update: Update): Map<number, Update> {
  let updateMap = new Map()
  model.clients.forEach(function(id) {updateMap.set(id, update)})
  return updateMap
}

function updatePlayers(model: Model, update: Update): Map<number, Update> {
  let updateMap = new Map()
  model.players.forEach(function(player, id) {updateMap.set(id, update)})
  return updateMap
}
