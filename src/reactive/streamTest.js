// @flow

import type {StreamManager, StreamConstructor} from './stream';
import {makeStreamManager} from './stream';

const streamManager = makeStreamManager();

function makeDrWorm(){
  var singLevel = 1;
  var triggerUpdate;
  return {
    depends: [],
    init: function(trigger){
      triggerUpdate = trigger;
    },
    onUpdate: function(){
      console.log("Dr worm updated, level = " + singLevel);
    },
    setSing: function(level){
      if (level != singLevel){
        singLevel = level;
        triggerUpdate();
      }
    },
    getSing: function(){
      return singLevel;
    }
  }
}


function makeDrums(){
  var drumLevel = 1;
  var triggerUpdate;
  return {
    depends: [],
    init: function(trigger){
      triggerUpdate = trigger;
    },
    onUpdate: function(){
      console.log("Drums updated, level = " + drumLevel);
    },
    setDrums: function(level){
      if (level != drumLevel){
        drumLevel = level;
        triggerUpdate();
      }
    },
    getDrums: function(){
      return drumLevel;
    }
  }
}

function makeNerdHerd(drWorm, drums){
  var triggerUpdate;
  return {
    depends: [drWorm, drums],
    init: function(trigger){
      triggerUpdate = trigger;
    },
    onUpdate(){
      console.log("Nerd herd updated, total song level = " + (drWorm.getSing() + drums.getDrums()));
    }
  }
}


const drWorm = makeDrWorm();
const drums = makeDrums();
const nerdHerd = makeNerdHerd(drWorm, drums);

console.log("initing streams")
streamManager.setupStream(drWorm);
streamManager.setupStream(drums);
streamManager.setupStream(nerdHerd);

console.log("changing sing level")
drWorm.setSing(2);

console.log("changing drums level")
drums.setDrums(3);
