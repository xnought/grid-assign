import assign from "./lap-jv";
import * as grid from "./grid";

export type point = number[];
export type metricFunc = (p1: point, p2: point) => number;
export type costMatrix = number[][];

export { assign, grid };
