// @flow
import type {Model} from './model';

export type Update = {
  model: Model,
  lastEventIdFor: Map<number, number>
}
