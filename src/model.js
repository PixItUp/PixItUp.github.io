//@flow

import type {Drawing} from "./drawing.js"

export type Model = {
  players: Map<number, Player>,
  mode: LobbyMode | PromptMode | GameMode | EndMode

}

export type Player = {
  name: string,
  clientId: number
}

export type LobbyMode = {
  name: "LobbyMode"
}

export type PromptMode = {
  name: "PromptMode",
  lines: Map<number, PhoneLine>
}

export type GameMode = {
  name: "GameMode",
  lines: Map<number, PhoneLine>
}

export type EndMode = {
  name: "EndMode",
  phoneNetwork: PhoneLine[]

}

export type PhoneLine = {
  line: (Drawing | string)[],
  startingPlayer: Player
}

export function makeModel(): Model {

  return {
    players: new Map(),
    mode: makeLobbyMode()
  }
}

export function nextPlayer() {

}

export function makePhoneLine(player: Player): PhoneLine {
  return {
    line: [],
    startingPlayer: player
  }
}

export function makeGameMode(lines: Map<number, PhoneLine>): GameMode {
  return {
    name: "GameMode",
    lines: lines
  }
}

export function makePromptMode(players: Map<number, Player>): PromptMode {
  let lines = new Map()
  players.forEach(function(player, id) {lines.set(id, makePhoneLine(player))})
  return {
    name: "PromptMode",
    lines: lines
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
