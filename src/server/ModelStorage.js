// @flow
/// This class exists to store a model and allow it to be updated by events.
/// It also keeps track of where the event come from becuase clients need
/// To know what the latest event that the server know about from it was.

import type {Model} from '../model';
import type {Event} from '../event';

export type ModelStorage = {
  updateWithEvent: (event: Event, clientId: number) => void,
  currentModel: () => Model,
  lastEventIdFor: () => Map<number, number>;
};

export function makeModelStorage(reducer: (Event, number, Model) => void,
  startModel: Model): ModelStorage{
    const model = startModel;
    const latestEventIds: Map<number, number> = new Map();//Stores for each user the latest event id

    function updateWithEvent(event: Event, clientId: number){
      reducer(event, clientId, model);
      latestEventIds.set(clientId, event.id);
    }

    function lastEventIdFor(clientId, number) {
      return latestEventIds;
    }

    function currentModel(){
      return model;
    }

    return {
      updateWithEvent,
      currentModel,
      lastEventIdFor
    }
}
