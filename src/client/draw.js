// @flow
var $ = require('jquery');
const sketch = require('../lib/sketch.js');
sketch.sketch($);

import type {DrawUpdate} from '../update';
import type {Container} from './htmlUtils';

export function setupDraw(update: DrawUpdate, socket: any){
  $('#drawing').sketch();
}
