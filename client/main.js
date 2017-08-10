const Newsletter = require('./newsletter');

let containerEl = document.body;
containerEl.querySelectorAll('[data-component="n-newsletter-signup"]')
	.forEach(instanceEl => {
		new Newsletter(instanceEl);
	});
