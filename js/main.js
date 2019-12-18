import Newsletter from './newsletter';

export function init (containerEl = document.body) {
	const newsletterSignupContainers = Array.from(containerEl.querySelectorAll('[data-component="n-newsletter-signup"]'));
	if (newsletterSignupContainers.length) {
		newsletterSignupContainers
			.forEach(instanceEl => {
				new Newsletter(instanceEl);
			});
	}
};
