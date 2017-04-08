// @flow
import type {Model} from './././././model';
import type {Event} from '././event';
import type {Reducer} from './server/ModelStorage';

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
  } else if (event.data.type === "Connect"){
    //bla
  }
}

const gameMode:Reducer = function(event, clientId, model){
  if (event.data.type === "Draw"){
    event.data.drawing;
  } else if (event.data.type === "Describe"){
    event.data.description;
  }
}
