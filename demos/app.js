'use strict';

const express = require('@financial-times/n-internal-tool');
const fixtures = require('./fixtures.json');
const chalk = require('chalk');
const errorHighlight = chalk.bold.red;
const highlight = chalk.bold.green;

const app = module.exports = express({
	name: 'public',
	systemCode: 'n-newsletter-signup-demo',
	withFlags: false,
	withHandlebars: true,
	withNavigation: false,
	withAnonMiddleware: false,
	hasHeadCss: false,
	demo: true,
	s3o: false,
	viewsDirectory: '/demos',
	layoutsDir: 'demos',
	partialsDirectory: process.cwd(),
	directory: process.cwd()
});

app.get('/', (req, res) => {
	res.render('demo', Object.assign({
		title: 'Test App',
		layout: 'demo-layout',
	}, fixtures));
});

app.post('/__myft/api/alerts/a0000000-a0a0-0000-a000-a000a0000a00/newsletters/000000000000000000000000/subscribe', (req, res) => {
	const data = {
		'isPremium': true,
		'referenceId': 'ft',
		'unsubscribeAction': '/__myft/api/alerts/a0000000-a0a0-0000-a000-a000a0000a00/newsletters/000000000000000000000000/unsubscribe',
		'subscribeAction': '/__myft/api/alerts/a0000000-a0a0-0000-a000-a000a0000a00/newsletters/000000000000000000000000/subscribe',
		'id': '12345',
		'name': 'FT',
		'subscriptionLevel': 'Premium',
		'inactive': false,
		'description': 'News, analysis and comment from the Financial Times, the world\'s leading global business publication.',
		'frequency': 'daily',
		'userIsSubscribed': true
	};
	res.json(data);
});

app.post('/__myft/api/alerts/a0000000-a0a0-0000-a000-a000a0000a00/newsletters/000000000000000000000000/unsubscribe', (req, res) => {
	const data = {
		'isPremium': true,
		'referenceId': 'ft',
		'unsubscribeAction': '/__myft/api/alerts/a0000000-a0a0-0000-a000-a000a0000a00/newsletters/000000000000000000000000/unsubscribe',
		'subscribeAction': '/__myft/api/alerts/a0000000-a0a0-0000-a000-a000a0000a00/newsletters/000000000000000000000000/subscribe',
		'id': '12345',
		'name': 'FT',
		'subscriptionLevel': 'Premium',
		'inactive': false,
		'description': 'News, analysis and comment from the Financial Times, the world\'s leading global business publication.',
		'frequency': 'daily',
		'userIsSubscribed': false
	};
	res.json(data);
});

function runPa11yTests () {
	const spawn = require('child_process').spawn;
	const pa11y = spawn('pa11y-ci');

	pa11y.stdout.on('data', (data) => {
		console.log(highlight(`${data}`)); //eslint-disable-line
	});

	pa11y.stderr.on('data', (error) => {
		console.log(errorHighlight(`${error}`)); //eslint-disable-line
	});

	pa11y.on('close', (code) => {
		process.exit(code);
	});
}

const listen = app.listen(5005);

if (process.env.PA11Y === 'true') {
	listen.then(runPa11yTests);
}
