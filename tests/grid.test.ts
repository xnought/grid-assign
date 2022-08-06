import { autoGridAssignment, generateGrid } from "../src/grid";

describe("grid API", () => {
	it("implemented", () => {
		expect(generateGrid).toBeDefined();
	});
	it("top-left anchored grids", () => {
		const grids = generateGrid({
			width: 100,
			height: 100,
			numRows: 2,
			numColumns: 2,
			translate: [0, 0],
			centerPoint: false,
		});
		const correctResult = [
			[0, 0],
			[50, 0],
			[0, 50],
			[50, 50],
		];
		expect(grids.gridWidth).toBe(50);
		expect(grids.gridHeight).toBe(50);
		expect(grids.gridPoints.length).toBe(4);
		expect(grids.gridPoints).toEqual(correctResult);
	});
	it("center anchored grids", () => {
		const grids = generateGrid({
			width: 100,
			height: 100,
			numRows: 2,
			numColumns: 2,
			translate: [0, 0],
			centerPoint: true,
		});
		const correctResult = [
			[25, 25],
			[75, 25],
			[25, 75],
			[75, 75],
		];
		expect(grids.gridWidth).toBe(50);
		expect(grids.gridHeight).toBe(50);
		expect(grids.gridPoints.length).toBe(4);
		expect(grids.gridPoints).toEqual(correctResult);
	});
});
