// @flow

console.log();

export function sum(a : number, b : number) : number {
  return a+b
}

function runOn<T>(a : (T) => T, b : T) : T {
  return a(b);
}

console.log(runOn((a) => a+1, 7));
