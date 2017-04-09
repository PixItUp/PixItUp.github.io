// @flow

import type {PromptUpdate} from '../update';
import type {Container} from './htmlUtils';
const $ = require("jquery");

export function setupPrompt(update: PromptUpdate, socket: any){
  function takePrompt() {
    socket.emit("event", JSON.stringify({
      data: {
        type: "Prompt",
        prompt: $("#prompt-input").val()
      }
    }))
    $("#prompt-input").val("")
    return false
  }
  $("#prompt-input").keypress(function(e) {
    if (e.which == 13) {
      takePrompt()
    }
  })
  $("#prompt-submit").click(takePrompt)
}
