'use strict';

const express = require('@financial-times/n-express');
const fixtures = require('./fixtures.json');

const { PageKitHandlebars, helpers } = require('@financial-times/dotcom-server-handlebars');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

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

app.set('views', __dirname);
app.set('view engine', '.html');

const templatePaths = glob.sync(path.resolve(__dirname, '../templates/**/*.html'));

// Read and register templates and partials
templatePaths.forEach(filePath => {
	const fileContent = fs.readFileSync(filePath, 'utf8');
	const relativePath = path.relative(path.resolve(__dirname, '../templates'), filePath);
	const partialName = 'n-newsletter-signup/templates/' + relativePath.replace('.html', '');
	handlebars.registerPartial(partialName, fileContent);
});

app.engine('.html', new PageKitHandlebars({
	cache: false,
	handlebars,
	helpers: {
		...helpers
	}
}).engine);

app.use('/public', express.static(path.join(__dirname, '../public'), { redirect: false }));

app.get('/', (req, res) => {
	const state = req.query.state || 'default';
	const cardState = fixtures[state];
	res.render('demo', Object.assign({
		title: 'Test App',
		layout: 'demo-layout',
	}, cardState));
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

const port = 5005;

app.listen(port, () => {
	console.log(`Demo is now running on port ${port}.`); // eslint-disable-line no-console
	console.log(`To access it, visit http://localhost:${port}`); // eslint-disable-line no-console
});
