const { toHaveNoViolations, configureAxe } = require('jest-axe');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const fixtures = require('./fixtures.json');

expect.extend(toHaveNoViolations);

const axe = configureAxe({
	rules: {
		// disable landmark rules when testing isolated components.
		'region': { enabled: false }
	}
});

// register partials
const partials = {
	'n-newsletter-signup/templates/partials/newsletter-form': fs.readFileSync(path.resolve(__dirname, '../templates/partials/newsletter-form.html'), 'utf8'),
	'n-myft-ui/components/csrf-token/input': '<input type="hidden" name="_csrf" value="mocked-csrf-token">',
};

Object.entries(partials).forEach(([name, content]) => {
	handlebars.registerPartial(name, content);
});

test('"newsletter" template should have no accessibility violations', async () => {
	const newsletterTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/newsletter.html'), 'utf8');

	const template = handlebars.compile(newsletterTemplate);

	const html = template(fixtures);

	const results = await axe(html);

	expect(results).toHaveNoViolations();
});

test('"simple" template should have no accessibility violations', async () => {
	const simpleTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/simple.html'), 'utf8');

	const template = handlebars.compile(simpleTemplate);

	const html = template(fixtures);

	const results = await axe(html);

	expect(results).toHaveNoViolations();
});