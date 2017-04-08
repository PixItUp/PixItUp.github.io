// @flow
// import type {Model} from './model';
import type {Drawing} from './drawing';

export type Update = LobbyUpdate | PromptMode | DescribeMode | DrawMode | EndgameMode

export type LobbyUpdate = {
  name: "LobbyMode",
  players: Array<string>
}

export type PromptMode = {
  name: "PromptMode"
}

export type DescribeMode = {
  name: "DescribeMode",
  drawing: Drawing
}

export type DrawMode = {
  name: "DrawMode",
  description: string
}

export type EndgameMode = {
  name: "EndgameMode"
}
