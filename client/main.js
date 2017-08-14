const Newsletter = require('./newsletter');

module.exports = {
	init: (containerEl = document.body) => {
		const newsletterSignupContainers = containerEl.querySelectorAll('[data-component="n-newsletter-signup"]');
		if (newsletterSignupContainers.length) {
			newsletterSignupContainers
			.forEach(instanceEl => {
				new Newsletter(instanceEl);
			});
		}
	}
}
