// @flow
var $ = require('jquery');
const sketch = require('../lib/sketch.js');
sketch.sketch($);

import type {DrawUpdate} from '../update';
import type {Container} from './htmlUtils';

export function setupDraw(update: DrawUpdate, socket: any){
  const canvas = $('#drawing')[0];
  const button = $("#submit-drawing");
  const submitted = $("#draw-submitted");

  button.show();
  submitted.hide();

  $(window).resize(resizeCanvas);//not 100% sure this will work

  function resizeCanvas(){
    const width = Math.min($("#drawDiv").width(), 750);
    $(canvas).attr('width',  width * 0.9);
    $(canvas).attr('height', width * 0.7);
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
    submitted.show();
    button.hide();
  }
  button.click(submitDrawing);

  $("#draw-prompt").text(update.description);
}
