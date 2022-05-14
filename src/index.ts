import assignOptimal from "./lap-jv";
export default assignOptimal;

function main() {
	console.log("test");
	const assignments = assignOptimal({
		assignees: [
			[0, 0, 0],
			[1, 1, 1],
			[5, 5, 2],
		],
		pointsToAssign: [
			[5, 5, 0],
			[1, 0, 0],
			[1, 1, 0],
		],
	});
	console.log(assignments);
}
main();
