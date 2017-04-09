// @flow
import type {Model} from './model';
import type {Event} from './event';
import type {Reducer} from './server/ModelStorage';
import type {Update} from './update';
import type {LobbyUpdate} from './update';
import {makeGameMode} from './model';
import {makePromptMode} from './model';
import type {PromptMode, GameMode, PhoneLine} from './model';
import type {PromptUpdate, DescribeUpdate, DrawUpdate, EndgameUpdate} from './update';
import {getNextPlayer, getPreviousPlayer, makeModel} from './model';
import type {Drawing} from './drawing';
import {makeJobQueue, finishJob, addJob, getJob} from './jobQueue';
import {getWords} from "./words";

export const reducer: Reducer = function(event, clientId, model){
  if (event.data.type === "Connect"){
    model.clients.add(clientId);
  } else if (event.data.type === "Disconnect"){
    model.clients.delete(clientId);
    if (model.clients.size === 0) {
      doYourselfForARestart(model)
    }
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
      let newPlayer = {name: event.data.name, jobQueue: makeJobQueue(), clientId: clientId, roundNumber: 0}
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
    if (words){
      if (model.mode.name === "PromptMode") {
        let lines = model.mode.lines
        let order = model.mode.playerOrder
        let currentLine = lines.get(clientId)
        let currentLineOwner = clientId
        let currentPlayer = model.players.get(clientId)
        let round = 0
        if (currentPlayer) {
          round = currentPlayer.roundNumber
          if (round) {
            for (let i = 0; i < round; i++) {
              currentLineOwner = getPreviousPlayer(order, currentLineOwner)
            }
          }
        }
        currentLine = lines.get(currentLineOwner)

        if (currentLine && currentLine.line) {
          if (currentLine.line.length >= round) {
            currentLine.line.push(words)
            if (currentPlayer) {
              currentPlayer.roundNumber = currentPlayer.roundNumber + 1
            }
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
          }
        } else {
          console.log("something weird happened involving a phone line which didn't exist")
        }
      } else {
        console.log("a prompt event occurred when we weren't even in prompt mode I mean what")
      }
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
      let currentLineOwner = clientId
      let currentPlayer = model.players.get(clientId)
      let round = 0
      if (currentPlayer) {
        round = currentPlayer.roundNumber
        if (round) {
          for (let i = 0; i < round; i++) {
            currentLineOwner = getPreviousPlayer(order, currentLineOwner)
          }
        }
      }
      currentLine = lines.get(currentLineOwner)
      if (currentLine) {
        if (currentLine.line.length >= round) {
          currentLine.line.push(drawing)
          let updateMap = new Map()
          let currentPlayer = model.players.get(clientId)
          if (currentPlayer) {
            currentPlayer.roundNumber = currentPlayer.roundNumber + 1
            console.log("incrementing roundnumber with draw")
            console.log(currentPlayer.roundNumber)
            finishJob(currentPlayer.jobQueue)
            if (currentPlayer.jobQueue.length > 0) {
              updateMap.set(clientId, getJob(currentPlayer.jobQueue))
            }
          }
          let nextPlayerId = getNextPlayer(order, clientId)
          let nextPlayer = model.players.get(nextPlayerId)
          if (nextPlayer) {
            if (currentLine.startingPlayer.clientId !== nextPlayer.clientId) {
              console.log("I don't think the next player started this phoneline")
              console.log(currentLine.startingPlayer.clientId)
              console.log(nextPlayer.clientId)
              if (currentPlayer) {
                console.log(currentPlayer.roundNumber)
              }
              let newUpdate = makeDescribeUpdate(drawing)
              addJob(nextPlayer.jobQueue, newUpdate)
              if (nextPlayer.jobQueue.length == 1) {
                updateMap.set(nextPlayerId, newUpdate)
              }
            } else {
              if (areWeDone(model)) {
                if (model.mode.name === "GameMode"){
                  return updateAll(model, makeEndgameUpdate(model.mode))
                } else {
                  console.log("well shit");
                }
              }
            }
          }
          return updateMap
        }
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
      let currentLineOwner = clientId
      let currentPlayer = model.players.get(clientId)
      let round = 0
      if (currentPlayer) {
        round = currentPlayer.roundNumber
        if (round) {
          for (let i = 0; i < round; i++) {
            currentLineOwner = getPreviousPlayer(order, currentLineOwner)
          }
        }
      }
      currentLine = lines.get(currentLineOwner)
      if (currentLine) {
        if (currentLine.line.length >= round) {
          currentLine.line.push(description)
          let updateMap = new Map()
          let currentPlayer = model.players.get(clientId)
          if (currentPlayer) {
            currentPlayer.roundNumber = currentPlayer.roundNumber + 1
            console.log("incrementing roundnumber in describe")
            console.log(currentPlayer.roundNumber)
            finishJob(currentPlayer.jobQueue)
            if (currentPlayer.jobQueue.length > 0) {
              updateMap.set(clientId, getJob(currentPlayer.jobQueue))
            }
          }
          let nextPlayerId = getNextPlayer(order, clientId)
          let nextPlayer = model.players.get(nextPlayerId)
          if (nextPlayer) {
            if (currentLine.startingPlayer.clientId !== nextPlayer.clientId) {
              console.log("I don't think the next player started this phoneline")
              console.log(currentLine.startingPlayer.clientId)
              console.log(nextPlayer.clientId)
              if (currentPlayer) {
                console.log(currentPlayer.roundNumber)
              }
              let newUpdate = makeDrawUpdate(description)
              addJob(nextPlayer.jobQueue, newUpdate)
              if (nextPlayer.jobQueue.length == 1) {
                updateMap.set(nextPlayerId, newUpdate)
              }
            } else {
              if (areWeDone(model)) {
                if (model.mode.name === "GameMode"){
                  return updateAll(model, makeEndgameUpdate(model.mode))
                } else {
                  console.log("well shit");
                }
              }
            }
          }

          return updateMap
        }
      }
    }
  }
}

function makePromptUpdate(model: Model): PromptUpdate {
  return {
    name: "PromptUpdate",
    suggestions: getWords()
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

function areWeDone(model : Model) : boolean {
  let done = true
  model.players.forEach(function(player, id) {done = (done && player.jobQueue.length === 0)})
  return done
}

function makeEndgameUpdate(mode: GameMode): EndgameUpdate {
  const lines: Array<PhoneLine> = [];
  mode.lines.forEach(function(line, id){
    lines.push(line);
  });
  return {
    name: "EndgameUpdate",
    lines: lines
  }
}

function doYourselfForARestart(model: Model) {
  let newOne = makeModel()
  for (let attr in newOne){
    model[attr] = newOne[attr];
  }
}
