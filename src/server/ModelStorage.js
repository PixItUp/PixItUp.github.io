// @flow
/// This class exists to store a model and allow it to be updated by events.
/// It also keeps track of where the event come from becuase clients need
/// To know what the latest event that the server know about from it was.

import type {Event} from '../event';

type ModelStorage<ModelT> = {
  updateWithEvent: (event: Event, userId: String) => void,
  currentModel: () => ModelT,
  lastEventIdFor: (userId: String) => ?number;
};

function makeModelStorage<ModelT>(reducer: (Event, ModelT) => void,
  startModel: ModelT): ModelStorage<ModelT>{
    const model = startModel;
    const latestEventIds: Map<String, number> = new Map();//Stores for each user the latest event id

    function updateWithEvent(event: Event, userId: String){
      reducer(event, model);
      latestEventIds.set(userId, event.id);
    }

    function lastEventIdFor(userId: String) {
      return latestEventIds.get(userId);
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
