// @flow

const $ = require("jquery");
import type {DescribeUpdate} from '../update';
import type {Container} from './htmlUtils';

export function setupDescribe(update: DescribeUpdate, socket: any){
  const submitted = $("#description-submitted");
  const button = $("#submit-description");
  const input = $("#describe-input")

  submitted.hide();
  input.prop("disabled", false);
  button.show();

  $("#prompt-image").attr('src', update.drawing.dataURI)
  function submitDescription() {
    const description = input.val();
    if (description){
      socket.emit("event", JSON.stringify({
        data: {
          type: "Describe",
          description: description
        }
      }))
      input.prop("disabled", true);
      button.hide();
      submitted.show();
    }
    return false
  }
  $("#describe-input").keypress(function(e) {
    if (e.which == 13) {
      return submitDescription()
    }
  })
  button.click(submitDescription);
}
