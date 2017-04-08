// @flow
import {Server} from 'http';
import {makeModelStorage} from './ModelStorage';
import type {ModelStorage} from './ModelStorage';
import {makeModel} from '../model';
import {reducer} from '../reducer';
import type {Event} from '../event';
import type {Update} from '../update';

const modelStorage: ModelStorage = makeModelStorage(reducer, makeModel());

type Client = {
  socket: any,
  id: number
}

let id = 0;
export function setup(io: Server){
  io.on('connection', function(socket){
    let clientId = id++;
    //
    socket.on('disconnect', () => {
      //
    })
    socket.on('event', function(eventStr){
      const event: Event = JSON.parse(eventStr);
      modelStorage.updateWithEvent(event, clientId);
    })
  });
  setTimeout(() => update(io), 20);
}

function update(io){
  var update: Update = {
    model: modelStorage.currentModel(),
    lastEventIdFor: modelStorage.lastEventIdFor()
  };
  io.emit("update", update);
}
