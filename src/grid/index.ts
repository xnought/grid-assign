import { point, assign } from "../index";
interface IGenerateGrid {
	width: number;
	height: number;
	numRows: number;
	numColumns: number;
	translate?: point;
	centerPoint?: boolean;
}

export function generateGrid({
	width,
	height,
	numRows,
	numColumns,
	centerPoint = false,
	translate = [0, 0],
}: IGenerateGrid) {
	const gridHeight = height / numRows;
	const gridWidth = width / numColumns;
	const gridPoints: point[] = [];

	let centerTranslate = [0, 0];
	if (centerPoint) {
		centerTranslate[0] = gridWidth / 2;
		centerTranslate[1] = gridHeight / 2;
	}

	let yPosition = translate[0];
	for (let r = 0; r < numRows; r++) {
		let xPosition = translate[1];
		for (let c = 0; c < numColumns; c++) {
			const gridPoint = [
				xPosition + centerTranslate[0],
				yPosition + centerTranslate[1],
			];
			gridPoints.push(gridPoint);
			xPosition += gridWidth;
		}
		yPosition += gridHeight;
	}

	return { gridHeight, gridWidth, gridPoints };
}

type ScaleLinear = (x: number) => number;
interface IGridAssignment {
	points: point[];
	screenWidth: number;
	screenHeight: number;
	screenX?: number;
	screenY?: number;
	numColumns: number;
	numRows: number;
}
export function autoGridAssignment({
	points,
	screenWidth,
	screenHeight,
	screenX = 0,
	screenY = 0,
	numColumns,
	numRows,
}: IGridAssignment) {
	// compute the grid on top of the points
	const { gridWidth, gridHeight, gridPoints } = generateGrid({
		height: screenHeight,
		width: screenWidth,
		numColumns,
		numRows,
		translate: [screenX, screenY],
	});

	// compute min max of the x and y directions of the points
	const pointExtent = computeMinMax({ points, accessor: (d) => d });
	const gridExtent = {
		x: [screenX, screenX + screenWidth],
		y: [screenY, screenY + screenHeight],
	};
	const convert = {
		pointToScreen: {
			x: scaleLinear({ domain: pointExtent.x, range: gridExtent.x }),
			y: scaleLinear({ domain: pointExtent.y, range: gridExtent.y }),
		},
		screenToPoint: {
			x: scaleLinear({ domain: gridExtent.x, range: pointExtent.x }),
			y: scaleLinear({ domain: gridExtent.y, range: pointExtent.y }),
		},
		apply2D: (
			point: point,
			converter: { x: ScaleLinear; y: ScaleLinear }
		) => [converter.x(point[0]), converter.y(point[1])],
	};

	const gridsInPointSpace = gridPoints.map((p) =>
		convert.apply2D(p, convert.screenToPoint)
	);

	// apply linear assignment to get optimal assignments
	const assignments = assign({ points, assignTo: gridsInPointSpace });

	// convert back to the screen space grids and give assignments
	const screenSpaceAssignments: {
		gridPoint: point;
		assignedPoint: point;
		assignedPointIndex: number;
		gridWidth: number;
		gridHeight: number;
	}[] = assignments.map((a, i) => {
		return {
			gridPoint: gridPoints[i],
			gridWidth,
			gridHeight,
			assignedPoint: points[a],
			assignedPointIndex: a,
		};
	});

	return { assignments: screenSpaceAssignments, pointConversions: convert };
}

/**
 * Given a point within the domain output a mapping to the range
 * *linearly*
 */
function scaleLinear({ domain = [0, 0], range = [0, 0] }): ScaleLinear {
	const x1 = domain[0],
		y1 = range[0];
	const x2 = domain[1],
		y2 = range[1];

	const deltaX = x2 - x1;
	if (deltaX === 0) {
		throw Error("cannot divide by 0 in slope calculation");
	}
	const deltaY = y2 - y1;

	// y = mx + b
	const m = deltaX / deltaY;
	const b = y1 - m * x1;
	const y = (x: number) => m * x + b;
	return y;
}

interface IMinMax<T> {
	points: T[];
	accessor: (d: T) => point;
}
function computeMinMax<T>({ points, accessor }: IMinMax<T>) {
	const xExtent = [Infinity, -Infinity];
	const yExtent = [Infinity, -Infinity];
	points.forEach((d) => {
		const point = accessor(d);
		const [x, y] = point;
		if (x > xExtent[1]) {
			xExtent[1] = x;
		}
		if (x < xExtent[0]) {
			xExtent[0] = x;
		}
		if (y > yExtent[1]) {
			yExtent[1] = y;
		}
		if (y < yExtent[0]) {
			yExtent[0] = y;
		}
	});
	return { x: xExtent, y: yExtent };
}
