// @flow
import type {Model} from './././././model';
import type {Event} from '././event';
import type {Reducer} from './server/ModelStorage';
import type {Update} from './update';
import type {LobbyUpdate} from './update';
import {makeGameMode} from './././././././././././model';

export const reducer:Reducer = function(event, clientId, model){
  if (model.mode.name === "LobbyMode") {
    return lobbyMode(event, clientId, model);
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
    model.mode = makeGameMode()
  }
}


function makeLobbyUpdate(model: Model): LobbyUpdate {
  let playerNames = []
  model.players.forEach(function(player, id) {playerNames.push(player.name)})
  return {name: "LobbyMode", players: playerNames}
}

const gameMode:Reducer = function(event, clientId, model){
  if (event.data.type === "Draw"){
    event.data.drawing;
  } else if (event.data.type === "Describe"){
    event.data.description;
  }
}



function updateAll(model: Model, update: Update): Map<number, Update> {
  let updateMap = new Map()
  model.players.forEach(function(player, id) {updateMap.set(id, update)})
  return updateMap
}
