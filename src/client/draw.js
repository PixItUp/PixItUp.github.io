// @flow
var $ = require('jquery');
const sketch = require('../lib/sketch.js');
sketch.sketch($);

import type {DrawUpdate} from '../update';
import type {Container} from './htmlUtils';

export function setupDraw(update: DrawUpdate, socket: any){
  const canvas = $('#drawing')[0];

  $(window).resize(resizeCanvas);//not 100% sure this will work

  function resizeCanvas(){
    $(canvas).attr('width', $("#drawDiv").width() * 0.9);
    $(canvas).attr('height', $("#drawDiv").width() * 0.7);
  }
  resizeCanvas();

  canvas.width = canvas.width;//Clears canvas

  $('#drawing').sketch();
  $('#drawing').sketch().actions = [];//Removed sketch's memory of the previous drawing
  window.element = $('#drawing')
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
