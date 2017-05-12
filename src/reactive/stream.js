// @flow
import {makeMultiMap} from './Multimap';
import type {MultiMap} from './Multimap';

export type TriggerUpdate = () => void
// export type SetDependencies = (Stream[]) => void
export type StreamConstructor = (TriggerUpdate) => Stream

export type StreamManager = {
  setupStream: (Stream) => void
}

export type Stream = {
  init: (TriggerUpdate) => void,
  depends: Stream[],
  onUpdate: () => void
}

export function makeStreamManager(): StreamManager{
  const streamMap: MultiMap<Stream, Stream> = makeMultiMap();


  function setupStream(stream: Stream): void{
    const updater: TriggerUpdate = function(){
      const others: ?Stream[] = streamMap.get(stream);
      if (others){
        others.forEach((function(otherStream){
          otherStream.onUpdate();
        }));
      } else {
        throw new Error("error when finding depending streams");
      }
    }
    stream.init(updater);
    stream.depends.forEach(function(depend){
      streamMap.set(depend, stream);
    })
    stream.onUpdate();
  }



  return {setupStream}
}
