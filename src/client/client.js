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
    window.divs = []
    divs.forEach((div, name) => {
      window.divs.push(div);
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
    const update: any = JSON.parse(updateStr);//NOTE: any not ideal but fuckit
    console.log("updated with " + updateStr);
    if (!update.name){
      console.log("invalid update recived: " + updateStr);
    } else {
      console.log("update type of " + String(update.name));
      setVisible(update.name);
      if (update.name === "LobbyUpdate"){
        setupLobby(update, socket);
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
})
