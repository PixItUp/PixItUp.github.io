// @flow
import io from 'socket.io-client';
import type {Update} from '../update';

const $ = require("jquery");


const socket = io();
// socket.emit("name", prompt("what is your name", "bro"));

const divs:Map<string, any> = new Map({
  LobbyMode: $("#lobbyDiv"),
  PromptMode: $("#promptDiv"),
  DescribeMode: $("#eventDiv"),
  DrawMode: $("#describeDiv"),
  EndgameMode: $("#endDiv")
});

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
  if (!update.type){
    console.log("invalid update recived: " + updateStr);
  } else {
    setVisible(update.name);
    if (update.type === "LobbyMode"){

    } else if (update.name === "LobbyMode"){

    } else if (update.name === "PromptMode"){

    } else if (update.name === "DescribeMode"){

    } else if (update.name === "DrawMode"){

    } else if (update.name === "EndgameMode"){

    } else {
      console.log("invalid update recived: " + updateStr);
    }
  }
})
