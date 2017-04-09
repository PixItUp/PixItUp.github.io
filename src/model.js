//@flow

import type {Drawing} from "./drawing.js"
import type {Update} from "./update.js"
import type {JobQueue} from "./jobQueue.js"

export type Model = {
  players: Map<number, Player>,
  clients: Set<number>,
  mode: LobbyMode | PromptMode | GameMode | EndMode

}

export type Player = {
  name: string,
  clientId: number,
  jobQueue: JobQueue
}

export type LobbyMode = {
  name: "LobbyMode"
}

export type PromptMode = {
  name: "PromptMode",
  playerOrder: number[],
  lines: Map<number, PhoneLine>
}

export type GameMode = {
  name: "GameMode",
  playerOrder: number[],
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
    clients: new Set(),
    mode: makeLobbyMode()
  }
}

export function makePhoneLine(player: Player): PhoneLine {
  return {
    line: [],
    startingPlayer: player
  }
}

export function makeGameMode(lines: Map<number, PhoneLine>, playerOrder: number[]): GameMode {
  return {
    name: "GameMode",
    playerOrder: playerOrder,
    lines: lines
  }
}

export function getNextPlayer(order : number[], id : number) : number {
  let pos = order.indexOf(id)
  if (pos < order.length - 1) {
    return order[pos+1]
  } else {
    return order[0]
  }
}

export function makePromptMode(players: Map<number, Player>): PromptMode {
  let lines = new Map()
  players.forEach(function(player, id) {lines.set(id, makePhoneLine(player))})
  let playerOrder = []
  players.forEach(function(player, id) {playerOrder.push(id)})
  return {
    name: "PromptMode",
    playerOrder: playerOrder,
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
