// @flow

import type {PromptUpdate} from '../update';
import type {Container} from './htmlUtils';
const $ = require("jquery");

export function setupPrompt(update: PromptUpdate, socket: any){
  const submitted = $("#prompt-submitted");
  const buttons = $("#promptButtons");
  const input = $("#prompt-input");

  buttons.show();
  input.prop("disabled", false);
  submitted.hide();

  function takePrompt() {
    const prompt = input.val();
    if (prompt){
      socket.emit("event", JSON.stringify({
        data: {
          type: "Prompt",
          prompt: prompt
        }
      }))
      buttons.hide();
      input.prop("disabled", "true");
      submitted.show();
    }
    return false
  }
  $("#prompt-input").keypress(function(e) {
    if (e.which == 13) {
      takePrompt()
    }
  })
  $("#prompt-submit").click(takePrompt)
}
