// @flow

const $ = require("jquery");
import type {LobbyUpdate} from '../update';
import type {Container} from './htmlUtils';
import {removeChildren} from './htmlUtils';
const only = require("onlyjs");

export function setupLobby(update: LobbyUpdate, socket: any, container: Container){
  const tableContainer = $("#table-container");
  const table = only.html({
    table: [
      {thead: [
        {tr: [
          {th: "Players"}
        ]}
      ]},
      {tbody: [
        {tr: [
          {td: "Wowzers mctrousersBUTT"}
        ]}
      ]}
    ]
  });
  removeChildren(tableContainer, table);
}
