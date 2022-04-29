declare type point2D = [number, number];
declare type metricFunc = (p1: point2D, p2: point2D) => number;
declare const assignToGrids: (assignTo: point2D[], points: point2D[], distanceMetric?: metricFunc) => number[];
export default assignToGrids;
