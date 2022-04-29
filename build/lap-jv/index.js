"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lap_1 = require("./lap");
const normSquared = (p1, p2) => {
    // no need to sqrt because comparing relative and monotonic
    return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2;
};
const repeater = (length, fill = 0) => new Array(length).fill(fill);
const balanceMatrix = (dists, fill = 0) => {
    const squareShape = dists[0].length;
    let merged = [];
    for (let i = dists.length; i < squareShape; i++) {
        merged.push(repeater(squareShape, fill));
    }
    return dists.concat(merged);
};
const createCostMatrix = (grids, points, metric = normSquared) => {
    let dists = [];
    for (let i = 0; i < grids.length; i++) {
        const grid = grids[i];
        let perGridAllDists = [];
        for (let j = 0; j < points.length; j++) {
            const point = points[j];
            const dist = metric(grid, point);
            perGridAllDists.push(dist);
        }
        dists.push(perGridAllDists);
    }
    return dists;
};
const getBestAssignments = (solutionAssignments, numGrids) => {
    let assignments = [];
    for (let i = 0; i < numGrids; i++) {
        const assignment = solutionAssignments[i];
        assignments.push(assignment);
    }
    return assignments;
};
const computeBestAssignments = (costMatrix, numGrids) => {
    const solution = lap_1.lap(costMatrix.length, costMatrix);
    const rowAssignments = getBestAssignments(solution.row, numGrids);
    return rowAssignments;
};
const assignToGrids = (assignTo, points, distanceMetric = normSquared) => {
    if (assignTo.length > points.length) {
        throw Error("there cant be leftover things that we never assigned.");
    }
    const cost = createCostMatrix(assignTo, points, distanceMetric);
    const balancedCost = balanceMatrix(cost);
    const gridAssignments = computeBestAssignments(balancedCost, assignTo.length);
    return gridAssignments;
};
exports.default = assignToGrids;
//# sourceMappingURL=index.js.map