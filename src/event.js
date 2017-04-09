// @flow

import type {Drawing} from './drawing';

export type Event = {
  id: number,
  data: SetName | Prompt | Describe | Draw | Disconnect | Connect | StartGame
}

export type SetName = {
  type: "SetName",
  name: string
}

export type Prompt = {
  type: "Prompt",
  prompt: string
}

export type Describe = {
  type: "Describe",
  description: string
}

export type Draw = {
  type: "Draw",
  drawing: Drawing
}

export type Connect = {
  type: "Connect"
}

export type Disconnect = {
  type: "Disconnect"
}

export type StartGame = {
  type: "StartGame"
}


//Each event generated on the same computer should have a different id
//So that events generated later have bigger id numbers
var id = 0;

export function createEvent(data: any): Event{
  return {
    id: id++,
    data: data
  }
}
