import { assign } from "../src/";

describe("linear assignment", () => {
	const taxiDriverLocations = [
		[0, 0],
		[1, 1],
	];
	const peopleCallingTaxiLocations = [
		[5, 4],
		[1, 0],
		[1, 1],
		[-1, 1],
	];

	const assignments = assign({
		points: peopleCallingTaxiLocations,
		assignTo: taxiDriverLocations,
	});

	it("implemented", () => {
		expect(assign).toBeDefined();
	});
	it("correct assignments", () => {
		expect(assignments).toEqual([1, 2]);
	});

	/* 
	output interpretation:
		assignment =  [ 1, 2 ]
		taxi driver 0 was assigned to person 1 at location (1,0)
		taxi driver 1 was assigned to person 2 at location (1,1)
	*/
});
