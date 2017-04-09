// @flow
import {Server} from 'http';
import {makeModelStorage} from './ModelStorage';
import type {ModelStorage} from './ModelStorage';
import {makeModel} from '../model';
import {reducer} from '../reducer';
import type {Event} from '../event';
import type {Update} from '../update';

const modelStorage: ModelStorage = makeModelStorage(reducer, makeModel());

export type Socket = {
  emit: (string, any) => void
};

const clients: Map<number, Socket> = new Map();

let id = 0;
export function setup(io: Server){
  io.on('connection', function(socket){
    let clientId = id++;
    clients.set(clientId, socket);

    //Let reducer know about new connection
    // console.log("DEBUG: client with id " + clientId + " added");
    modelStorage.updateWithEvent({id: -1, data: {type: "Connect"}}, clientId, clients);

    //
    socket.on('disconnect', () => {
      // console.log("DEBUG: client with id " + clientId + " DISCONNECTED");
      clients.delete(clientId);
      modelStorage.updateWithEvent({id: 666666666666, data: {type: "Disconnect"}}, clientId, clients);
    })
    socket.on('event', function(eventStr){
      const event: Event = JSON.parse(eventStr);
      modelStorage.updateWithEvent(event, clientId, clients);
    })
  });
}
