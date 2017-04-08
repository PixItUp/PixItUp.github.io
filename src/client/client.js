// @flow
import io from 'socket.io-client';
import type {Update} from '../update';

const $ = require("jquery");


const socket = io();
// socket.emit("name", prompt("what is your name", "bro"));

const divs:Map<string, any> = new Map({
  LobbyUpdate: $("#lobbyDiv"),
  PromptUpdate: $("#promptDiv"),
  DescribeUpdate: $("#eventDiv"),
  DrawUpdate: $("#describeDiv"),
  EndgameUpdate: $("#endDiv")
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
    if (update.type === "LobbyUpdate"){

    } else if (update.name === "LobbyUpdate"){

    } else if (update.name === "PromUpdate"){

    } else if (update.name === "DescribeUpdate"){

    } else if (update.name === "DrawUpdate"){

    } else if (update.name === "EndgameUpdate"){

    } else {
      console.log("invalid update recived: " + updateStr);
    }
  }
})
