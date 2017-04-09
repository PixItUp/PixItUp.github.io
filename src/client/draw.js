// @flow
var $ = require('jquery');
const sketch = require('../lib/sketch.js');
sketch.sketch($);

import type {DrawUpdate} from '../update';
import type {Container} from './htmlUtils';

export function setupDraw(update: DrawUpdate, socket: any){
  const canvas = $('#drawing')[0];
  canvas.width = canvas.width-1;//Clears canvas
  canvas.width = canvas.width+1;//Clears canvas
  $('#drawing').sketch();
  function submitDrawing() {
    console.log($('#drawing')[0].toDataURL());
    socket.emit("event", JSON.stringify({
      data: {
        type: "Draw",
        drawing: {
          dataURI: $('#drawing')[0].toDataURL()
        }
      }
    }))
  }
  $("#submit-drawing").click(submitDrawing);

  $("#draw-prompt").text(update.description);
}
