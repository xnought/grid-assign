# Grid Assignment API and Linear Assignment API

This repository is a simple and general API to use the Linear Assignment Problem Algorithm.

It uses the LAP-JV implemented from [here](https://github.com/Fil/lap-jv). These are almost the same, but
I've added the capabilities to also account for an unbalanced cost matrix. For a visual example, check out the problem adapted to show t-SNE embeddings in a square grid on [observable: t-SNE Grid live](https://observablehq.com/@xnought/t-sne-grid-live).

In the example above, they assign n points to n assignees. For example, if I wanted to assign 10 taxi drivers to 10 people on the map. I could compute the distance of each taxi driver to each person (n by n matrix where rows are taxi drivers and the column is the distance to each person). Then I could use the Linear assignment problem to compute the optimal assignments such that we minimize the total sum of distances to the assignments.

But what if there are only 5 taxi drivers and 20 people who want a taxi? This is an unbalanced problem and would result in a cost matrix of 5 x 20.

This package will take in this non-square matrix and return the 5 best assignments. Whereas you could not do this with the previous javascript implementation above out-of-the-box.

## Usage

Install via [npm](https://www.npmjs.com/package/linear-assignment-js) like this:

```bash
npm install linear-assignment-js
```

Then you can use it by importing the default function

```javascript
import * as linearAssignment from "linear-assignment-js";
// const linearAssignment = require("linear-assignment-js");
```

Then you can interface with the function like this

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

const assignments = linearAssignment.assign({
	points: peopleCallingTaxiLocations,
	assignTo: taxiDriverLocations,
});

/* 
output interpretation:
	assignment =  [ 1, 2 ]
	taxi driver 0 was assigned to person 1 at location (1,0)
	taxi driver 1 was assigned to person 2 at location (1,1)
*/
```
