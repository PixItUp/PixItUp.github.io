// @flow
import io from 'socket.io-client';
import type {Update} from '../update';

import {setupLobby} from './lobby';
import {setupPrompt} from './prompt';
import {setupDraw} from './draw';
import {setupDescribe} from './describe';
import {setupEnd} from './end';

const $ = require("jquery");


const socket = io();
// socket.emit("name", prompt("what is your name", "bro"));

const divs:Map<string, any> = new Map([
  ["LobbyUpdate", $("#lobbyDiv")],
  ["PromptUpdate", $("#promptDiv")],
  ["DescribeUpdate", $("#eventDiv")],
  ["DrawUpdate", $("#describeDiv")],
  ["EndgameUpdate", $("#endDiv")]
]);

window.divs = divs;

function setVisible(modeName: string){
  divs.forEach((div, name) => {
    div.hide();
  })
  const div = divs.get(modeName);
  if(div){
    div.show();
  } else {
    throw "Invalid arg to setVisible";
  }
}

socket.on("update", function(updateStr){
  const update: Update = JSON.parse(updateStr);
  if (!update.name){
    console.log("invalid update recived: " + updateStr);
  } else {
    console.log("update type of " + update.name);
    setVisible(update.name);
    if (update.name === "LobbyUpdate"){
      setupLobby(update);
    } else if (update.name === "PromptUpdate"){
      setupPrompt(update);
    } else if (update.name === "DescribeUpdate"){
      setupDescribe(update);
    } else if (update.name === "DrawUpdate"){
      setupDraw(update);
    } else if (update.name === "EndgameUpdate"){
      setupEnd(update);
    } else {
      console.log("invalid update recived: " + updateStr);
    }
  }
})
