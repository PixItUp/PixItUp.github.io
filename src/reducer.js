// @flow
import type {Model} from './model';
import type {Event} from './event';
import type {Reducer} from './server/ModelStorage';
import type {Update} from './update';
import type {LobbyUpdate} from './update';
import {makeGameMode} from './model';
import {makePromptMode} from './model';
import type {PromptMode} from './model';
import type {PromptUpdate} from './update';

export const reducer: Reducer = function(event, clientId, model){
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
    let newPlayer = {name: event.data.name, clientId: clientId}
    model.players.set(clientId, newPlayer)
    return updateAll(model, makeLobbyUpdate(model))
  } else if (event.data.type === "Connect"){
    //bla
  } else if (event.data.type === "StartGame") {
    model.mode = makePromptMode(model.players)
  }
}

const promptMode: Reducer = function(event, clientId, model) {
  if (event.data.type === "Prompt") {
    let words = event.data.prompt
    if (model.mode.name === "PromptMode") {
      let lines = model.mode.lines
      let currentLine = lines.get(clientId)
      if (currentLine && currentLine.line) {
        currentLine.line.push(words)
        let promptsDone = true
        lines.forEach(function(line, id) {promptsDone = promptsDone && line.line[0]})
        if (promptsDone) {
          model.mode = makeGameMode(lines)
        }
        //let assignToNext = makePromptUpdate(model)

      } else {
        console.log("something weird happened involving a phone line which didn't exist")
      }
    } else {
      console.log("a prompt event occurred when we weren't even in prompt mode I mean what")
    }

  }
}

function makePromptUpdate(model: Model): PromptUpdate {
  return {
    name: "PromptUpdate"
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
      let currentLine = lines.get(clientId)
      if (currentLine && currentLine.line) {
        currentLine.line.push(drawing)
      } else {
        console.log("you have dialed an imaginary number. please rotate phone by 90 degrees and try again")
      }
    } else {
      console.log("a draw event occurred when we weren't in game mode")
    }

  } else if (event.data.type === "Describe"){
    event.data.description;
  }
}



function updateAll(model: Model, update: Update): Map<number, Update> {
  let updateMap = new Map()
  model.players.forEach(function(player, id) {updateMap.set(id, update)})
  return updateMap
}
