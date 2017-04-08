// @flow
import type {Pixel, Grid} from '../grid';

function dispGrid(canvas: HTMLCanvasElement, grid: Grid){
  const ctxx:any = canvas.getContext();
  var ctx: CanvasRenderingContext2D;
  if (ctxx instanceof CanvasRenderingContext2D){
    ctx = ctxx;
  }

  const size = Math.min(canvas.width, canvas.height);
  const pixSize = size / grid.length;
  grid.forEach((row, i) => {
    (pixel, j) => {
      const x = i * pixSize;
      const y = j * pixSize;
    }
  });
}
