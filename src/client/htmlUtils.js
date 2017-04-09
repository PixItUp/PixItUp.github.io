// @flow
import * as only from "onlyjs";

export type Container = {
  html: HTMLDivElement,
  removeChild: () => void,
  setChild: (HTMLElement) => void
}
export function removeChildren(node: HTMLElement, newChild: ?HTMLElement){
  while (node.hasChildNodes()) {
    if (node.lastChild){
      node.removeChild(node.lastChild);
    } else {
      throw "this should never happen";
    }
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
