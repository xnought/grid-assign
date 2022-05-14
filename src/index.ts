import optimalLinearAssignment from "./lap-jv";
export default optimalLinearAssignment;

// function main() {
// 	const taxiDriverLocations = [
// 		[0, 0],
// 		[1, 1],
// 	];
// 	const peopleCallingTaxiLocations = [
// 		[5, 4],
// 		[1, 0],
// 		[1, 1],
// 		[-1, 1],
// 	];

// 	const assignments = optimalLinearAssignment({
// 		assignees: taxiDriverLocations,
// 		pointsToAssign: peopleCallingTaxiLocations,
// 	});

// 	console.log("0 indexing");
// 	console.log("assignment indices", assignments);
// 	const taxiDriverAssignment0 = peopleCallingTaxiLocations[assignments[0]];
// 	const taxiDriverAssignment1 = peopleCallingTaxiLocations[assignments[1]];
// 	console.log(
// 		`taxi driver 0 was assigned to person ${assignments[0]} at location (${taxiDriverAssignment0})`
// 	);
// 	console.log(
// 		`taxi driver 1 was assigned to person ${assignments[1]} at location (${taxiDriverAssignment1})`
// 	);
// }
// main();
