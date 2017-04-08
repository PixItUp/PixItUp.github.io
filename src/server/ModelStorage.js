// @flow
/// This class exists to store a model and allow it to be updated by events.
/// It also keeps track of where the event come from becuase clients need
/// To know what the latest event that the server know about from it was.

import type {Event} from '../event';
import type {Model, Player} from '../model';

type ModelStorage = {
  updateWithEvent: (event: Event, player: Player) => void,
  currentModel: () => Model,
  lastEventIdFor: (player: Player) => ?number;
};

function makeModelStorage(reducer: (Event, Model) => void,
  startModel: Model): ModelStorage{
    const model = startModel;
    const latestEventIds: Map<string, number> = new Map();//Stores for each user the latest event id

    function updateWithEvent(event: Event, player: Player){
      reducer(event, model);
      latestEventIds.set(player.name, event.id);
    }

    function lastEventIdFor(player: Player) {
      return latestEventIds.get(player.name);
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
