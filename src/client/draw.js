
var $ = require('jquery');
const sketch = require('../lib/sketch.js');
sketch.sketch($);


$(document).ready(function(){
  console.log("LOCKED N LOADED")

  $(function() {
    $.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
      $('#tools').append("<a href='#colors_sketch' data-color='" + this + "' style='width: 10px; height: 10px; background: " + this + ";'><div style='width: 10px'>O</a> ");
    });
    $.each([3, 5, 10, 15], function() {
      $('#tools').append("<a href='#colors_sketch' data-size='" + this + "' style='background: #ccc'>" + this + "</a> ");
    });
    $('#colors_sketch').sketch();
  });
})
