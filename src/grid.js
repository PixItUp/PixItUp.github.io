// @flow

export type Pixel = bool;
export type Grid = Array<Array<Pixel>>;

const GRID_SIZE = 50;
const DEFAULT_VALUE:Pixel = false;

export function emptyGrid(): Grid{
  const grid: Grid = [];
  for (let i = 0; i < GRID_SIZE; i++){
    const row = [];
    for (let j = 0; i < GRID_SIZE; i++){
      row.push(DEFAULT_VALUE);
    }
    grid.push(row);
  }
  return grid;
}
