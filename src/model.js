//@flow

import type {Drawing} from "./drawing.js"

export type Model = {
  players: Map<number, Player>,
  currentPlayer: number,
  mode: LobbyMode | GameMode | EndMode

}

export type Player = {
  name: string,
  clientId: number
}

export type LobbyMode = {
  name: "LobbyMode"
}

export type GameMode = {
  name: "GameMode",
  lines: PhoneLine[]
}

export type EndMode = {
  name: "EndMode",
  phoneNetwork: PhoneLine[]

}

export type PhoneLine = {
  id: number,
  line: (Drawing | string)[],
  startingPlayer: Player
}

export function makeModel(): Model {
  let playerSet = []
  let currentPlayer = 0

  return {
    players: new Map(),
    currentPlayer: 0,
    mode: makeLobbyMode()
  }
}

export function makeGameMode(): GameMode {
  return {
    name: "GameMode",
    lines: []
  }
}

export function makeLobbyMode(): LobbyMode {
  return {
    name: "LobbyMode",
  }
}

function playerNames(model: Model) {
  model.players.forEach(function(element) {console.log(element.name)})
}
