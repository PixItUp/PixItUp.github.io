// @flow
import type {Model} from './././././model';
import type {Event} from '././event';

export function reducer(event: Event, clientId: number, model: Model){
  if (model.mode.name === "LobbyMode") {
    lobbyMode(event, clientId, model)
  }
}

function lobbyMode(event: Event, clientId: number, model: Model) {
  if (event.data.type === "SetName") {
    let newPlayer = {name: event.data.name, clientId: clientId}
    model.players.set(clientId, newPlayer)
  }
}
