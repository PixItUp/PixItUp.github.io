//@flow

export type Model = {
  players: Player[],
  currentPlayer: number
}

export type Player = {
  name: string,
  position: number
}

export function makeModel(): Model {
  var playerSet = []
  var numPlayers = 0
  var currentPlayer = 0

  return {players: playerSet, numPlayers: numPlayers, currentPlayer: currentPlayer}
}

function playerNames(model: Model) {
  model.players.forEach(function(element) {console.log(element.name)})
}
