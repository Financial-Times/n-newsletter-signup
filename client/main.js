const Newsletter = require('./newsletter');

let containerEl = document.body;
const newsletterSignupContainers = containerEl.querySelectorAll('[data-component="n-newsletter-signup"]');

if (newsletterSignupContainers.length) {
	newsletterSignupContainers
		.forEach(instanceEl => {
			new Newsletter(instanceEl);
		});
}
