// @flow

import type {EndgameUpdate} from '../update';
import type {Container} from './htmlUtils';
import type {Drawing} from '../drawing';
import type {PhoneLine} from "../model";
import {removeChildren} from "./htmlUtils";
const only = require("onlyjs");
const $ = require("jquery");

function phoneToDiv(input: string|Drawing): HTMLElement{
  var element;
  if (typeof input === "string"){
    element = {p: input};
  } else {
    element = {img: "", src: input.dataURI, alt: "Display error"}
  }
  return only.html({
    div: [
      element
    ], class: "item resizePls text-center"
  });
}

function makeCarouselInner(line: PhoneLine): HTMLElement[]{
  var divs = line.line.map(phoneToDiv);
  divs[0].className += " active";
  return divs;
}

var carId = 0;
function makeCarousel(line: PhoneLine): HTMLElement{
  var car = only.html({
    div: [
      {
        div: makeCarouselInner(line), class: "carousel-inner", role: "listbox"
      },
      {
        a: [
          {span: [], class: "glyphicon glyphicon-chevron-left",  "aria-hidden":"true"},
          {span: ["Previous"], class: "sr-only"}
        ],
        'data-slide':"prev", class: "left carousel-control", href:("#carous" + carId), role:"button"
      },
      {
        a: [
          {span: [], class: "glyphicon glyphicon-chevron-right",  "aria-hidden":"true"},
          {span: ["Previous"], class: "sr-only"}
        ],
        'data-slide':"next", class: "right carousel-control", href:("#carous" + carId), role:"button"
      }
    ], class:"carousel slide", id: ("carous" + carId)
  });
  carId++;
  return car;
}

export function setupEnd(update: EndgameUpdate, socket: any){
  console.log("got endgame update", update);
  const carousels = update.lines.map(makeCarousel);
  const div = $("#endDiv")[0];
  removeChildren(div);
  carousels.forEach(function(carous){
    div.appendChild(carous);
  });

  function resizeCanvas(){
    const width = Math.min($(document).width(), $(document).height());
    $(".resizePls").width(width * 0.5);
    $(".resizePls").height(width * 0.5);
  }
  resizeCanvas();
}
