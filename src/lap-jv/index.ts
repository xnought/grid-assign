import { lap } from "./lap";

type point = number[];
type metricFunc = (p1: point, p2: point) => number;
type costMatrix = number[][];

const normSquared = (p1: point, p2: point): number => {
	// no need to sqrt because comparing relative and monotonic
	let norm = 0;
	for (let i = 0; i < p1.length; i++) {
		norm += (p1[i] - p2[i]) ** 2;
	}
	return norm;
};

const rowPadding = (length: number, fillValue?: number) => {
	const blankArray = new Array(length);
	if (fillValue !== undefined) {
		blankArray.fill(fillValue);
	}
	return blankArray;
};

const balanceMatrix = (dists: number[][], fill: number = 0) => {
	const squareShape = dists[0].length;
	let merged = [];
	for (let i = dists.length; i < squareShape; i++) {
		const blankRow = rowPadding(squareShape);
		merged.push(blankRow);
	}
	return dists.concat(merged);
};

const createCostMatrix = (
	grids: point[],
	points: point[],
	metric: metricFunc = normSquared
): costMatrix => {
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

const getBestAssignments = (
	solutionAssignments: Int32Array,
	numGrids: number
): number[] => {
	let assignments = [];
	for (let i = 0; i < numGrids; i++) {
		const assignment = solutionAssignments[i];
		assignments.push(assignment);
	}
	return assignments;
};

const computeBestAssignments = (
	costMatrix: costMatrix,
	numGrids: number
): number[] => {
	const solution = lap(costMatrix.length, costMatrix);
	const rowAssignments = getBestAssignments(solution.row, numGrids);
	return rowAssignments;
};

const assignToGrids = ({
	assignTo,
	points,
	distanceMetric = normSquared,
}: {
	assignTo: point[];
	points: point[];
	distanceMetric?: metricFunc;
}): number[] => {
	if (assignTo.length > points.length) {
		throw Error("there cant be leftover things that we never assigned.");
	}
	const cost = createCostMatrix(assignTo, points, distanceMetric);
	const balancedCost = balanceMatrix(cost);
	const gridAssignments = computeBestAssignments(
		balancedCost,
		assignTo.length
	);
	return gridAssignments;
};

export default assignToGrids;
