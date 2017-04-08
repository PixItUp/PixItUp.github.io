// @flow
import io from 'socket.io-client';

console.log('hi');

const socket = io();
window.socket = socket;
//socket.emit("name", prompt("what is your name", "bro"));
