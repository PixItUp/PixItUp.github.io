// @flow

const $ = require("jquery");
import type {DescribeUpdate} from '../update';
import type {Container} from './htmlUtils';

export function setupDescribe(update: DescribeUpdate, socket: any){
  $("#prompt-image").attr('src', update.drawing.dataURI)
  function submitDescription() {
    socket.emit("event", JSON.stringify({
      data: {
        type: "Describe",
        description: $("#describe-input").val()
      }
    }))
    $("#describe-input").val("")
    return false
  }
  $("#describe-input").keypress(function(e) {
    if (e.which == 13) {
      return submitDescription()
    }
  })
}
