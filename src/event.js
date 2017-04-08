// @flow

export type Event = {
  id: number,
  data: any
}


//Each event generated on the same computer should have a different id
//So that events generated later have bigger id numbers
var id = 0;

export function createEvent(data: any): Event{
  return {
    id: id++,
    data: data
  }
}