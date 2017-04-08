// @flow
var $ = require('jquery');
const sketch = require('../lib/sketch.js');
sketch.sketch($);

import type {DrawUpdate} from '../update';

export function makeLobby(update: DrawUpdate, socket: any){
  $('#colors_sketch').sketch();
}
