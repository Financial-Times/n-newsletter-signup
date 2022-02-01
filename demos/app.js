'use strict';

const express = require('@financial-times/n-express');
const fixtures = require('./fixtures.json');
const chalk = require('chalk');
const errorHighlight = chalk.bold.red;
const highlight = chalk.bold.green;

const { PageKitHandlebars, helpers } = require('@financial-times/dotcom-server-handlebars');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

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
	directory: process.cwd(),
});

const templatePartialDirectory = path.join(__dirname, '../templates/partials');
fs.readdirSync(templatePartialDirectory).forEach(filename => {
	handlebars.registerPartial(
		`templates/${filename.substr(0, filename.lastIndexOf('.'))}`,
		fs.readFileSync(path.join(templatePartialDirectory, filename), 'utf8')
	);
});

const templateDirectory = path.join(__dirname, '../templates');
fs.readdirSync(templateDirectory).forEach(filename => {
	if (filename.includes('html')){
		handlebars.registerPartial(
			`templates/partials/${filename.substr(0, filename.lastIndexOf('.'))}`,
			fs.readFileSync(path.join(templateDirectory, filename), 'utf8')
		);
	}
});

const rootDirectory = __dirname;
fs.readdirSync(rootDirectory).forEach(filename => {
	if (filename.includes('html')){
		handlebars.registerPartial(
			`demos/${filename.substr(0, filename.lastIndexOf('.'))}`,
			fs.readFileSync(path.join(rootDirectory, filename), 'utf8')
		);
	}
});

app.set('views', __dirname);
app.set('view engine', '.html');

app.engine('.html', new PageKitHandlebars({
	cache: false,
	handlebars,
	helpers: {
		...helpers
	}
}).engine);

app.use('/public', express.static(path.join(__dirname, '../public'), { redirect: false }));

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
