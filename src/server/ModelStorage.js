// @flow
/// This class exists to store a model and allow it to be updated by events.
/// It also keeps track of where the event come from becuase clients need
/// To know what the latest event that the server know about from it was.

import type {Model} from '../model';
import type {Event} from '../event';
import type {Update} from '../update';
import type {Socket} from './clientManager';

export type ModelStorage = {
  updateWithEvent: (event: Event, clientId: number, clients: Map<number, Socket>) => void,
  currentModel: () => Model
};

export type Reducer = (Event, number, Model) => ?Map<number, Update>;


export function makeModelStorage(reducer: Reducer,
  startModel: Model): ModelStorage{
    const model = startModel;

    function updateWithEvent(event: Event, clientId: number, clients){
      const updates = reducer(event, clientId, model);
      // console.log("DEBUG: updates for client " + clientId + " is " + JSON.stringify(updates));
      if (updates){
        updates.forEach((update, id) => {
          const socket = clients.get(id);
          if (socket){
            socket.emit("update", JSON.stringify(update));
          } else {
            console.log("this is bads becuz the socket is ", socket)
            console.log("clients is ", clients);
          }
        })
      }
    }

    function currentModel(){
      return model;
    }

    return {
      updateWithEvent,
      currentModel
    }
}
