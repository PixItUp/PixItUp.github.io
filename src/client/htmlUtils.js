// @flow
import * as only from "onlyjs";

export type Container = {
  html: HTMLDivElement,
  removeChild: () => void,
  setChild: (HTMLElement) => void
}
export function removeChildren(node, newChild: ?HTMLElement){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
  if (newChild){
    node.appendChild(newChild);
  }
}

export function makeContainer(){
  var div = only.html({div: []});
  function removeChild(){
    removeChildren(div);
  }
  function setChild(node: HTMLElement){
    removeChild();
    div.appendChild(node);
  }
  return {
    html: div,
    removeChild: removeChild,
    setChild: setChild
  }
}
