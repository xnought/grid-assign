# Grid Assignment

This repository is a simple and general API to use the Linear Assignment Problem Algorithm. It also has a much higher level grid assignment API that automatically generates the grids for the screen and assigns the points to the grids.

It uses the LAP-JV implemented from [here](https://github.com/Fil/lap-jv). These are almost the same, but
I've added the capabilities to also account for an unbalanced cost matrix. For a visual example, check out the problem adapted to show t-SNE embeddings in a square grid on [observable: t-SNE Grid live](https://observablehq.com/@xnought/t-sne-grid-live).

In the example above, they assign n points to n assignees. For example, if I wanted to assign 10 taxi drivers to 10 people on the map. I could compute the distance of each taxi driver to each person (n by n matrix where rows are taxi drivers and the column is the distance to each person). Then I could use the Linear assignment problem to compute the optimal assignments such that we minimize the total sum of distances to the assignments.

But what if there are only 5 taxi drivers and 20 people who want a taxi? This is an unbalanced problem and would result in a cost matrix of 5 x 20.

This package will take in this non-square matrix and return the 5 best assignments. Whereas you could not do this with the previous javascript implementation above out-of-the-box.

## Usage

Install via [npm](https://www.npmjs.com/package/grid-assign-js) like this:

```bash
npm install grid-assign-js
```

```javascript
import * as gridAssign from "grid-assign-js";
```

### Grid Assignment

```javascript
const pointsToAssign = [
	[5, 4],
	[1, 0],
	[1, 1],
	[-1, 1],
];

// get grid API
const { grid } = gridAssign;

// get grid assignments for a 2 by 2 grid
// in a 500 by 500 pixels space
const { assignments } = grid.autoGridAssignment({
	points: pointsToAssign,
	numColumns: 2,
	numRows: 2,
	screenWidth: 500, // 500 px
	screenHeight: 500, // 500 px
});

/*
	assignments = {
		gridPoint: point;
		gridWidth: number;
		gridHeight: number;

		assignedPoint: point;
		assignedPointIndex: number;
	}[]

	yeah it's that easy
*/
```

### Linear Assignment Problem

```javascript
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

const assignments = gridAssign.assign({
	points: peopleCallingTaxiLocations,
	assignTo: taxiDriverLocations,
});

/* 
output interpretation:
	assignments =  [ 1, 2 ]
	taxi driver 0 was assigned to person 1 at location (1,0)
	taxi driver 1 was assigned to person 2 at location (1,1)
*/
```

For more detail take a look at the types and the test examples :)
