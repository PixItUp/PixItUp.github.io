// @flow

const $ = require("jquery");
window.jQuery = $;
import type {LobbyUpdate} from '../update';
import type {Container} from './htmlUtils';
import {removeChildren} from './htmlUtils';
const only = require("onlyjs");

function makeTable(players){
  return players.map((player) => {
    return only.html({
      tr: [
        {td: player}
      ]
    })
  })
}

export function setupLobby(update: LobbyUpdate, socket: any){
  const tableContainer = $("#table-container")[0];
  const table = only.html({
    table: [
      {thead: [
        {tr: [
          {th: "Players"}
        ]}
      ]},
      {tbody: makeTable(update.players)}
    ], class: "table order-list"
  });
  removeChildren(tableContainer, table);
}
