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

$(document).ready(function(){
  const divs:Map<string, any> = new Map([
    ["LobbyUpdate", $("#lobbyDiv")],
    ["PromptUpdate", $("#promptDiv")],
    ["DescribeUpdate", $("#describeDiv")],
    ["DrawUpdate", $("#drawDiv")],
    ["EndgameUpdate", $("#endDiv")]
  ]);

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
    const update: any = JSON.parse(updateStr);//NOTE: any not ideal (in fact it is completely unsafe) but fuckit
    if (!update.name){
      console.log("invalid update recived: " + updateStr);
    } else {
      setVisible(update.name);
      if (update.name === "LobbyUpdate"){
        setupLobby(update, socket);
      } else if (update.name === "PromptUpdate"){
        setupPrompt(update, socket);
      } else if (update.name === "DescribeUpdate"){
        setupDescribe(update, socket);
      } else if (update.name === "DrawUpdate"){
        setupDraw(update, socket);
      } else if (update.name === "EndgameUpdate"){
        setupEnd(update, socket);
      } else {
        console.log("invalid update recived: " + updateStr);
      }
    }
  })
})
