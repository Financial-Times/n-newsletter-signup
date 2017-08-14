module.exports = {
	files: {
		allow: [],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'a0000000-a0a0-0000-a000-a000a0000a00', // demos/app.js:32|36|37|49|53|54, demos/fixtures.json:4|5
			'000000000000000000000000' // demos/app.js:32|36|37|49|53|54, demos/fixtures.json:4|5
		]
	}
};
