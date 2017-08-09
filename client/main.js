class Newsletter {
	constructor (instanceEl) {
			this.options = {
					newsletterId: instanceEl.dataset.newsletterId
			};
			this.init(instanceEl);
	}

	init (instanceEl) {
		const newsletterSignupBotton = instanceEl.querySelector('.n-newsletter-signup-button');
		newsletterSignupBotton.addEventListener('click', (event) => {
			event.preventDefault();
			this.handleSignup(event);
		});
	}

	handleSignup (event) {
		event.preventDefault();
		// const url = event.target.action;

		// TODO ask do we need this?
		// this.el.setAttribute('aria-busy', 'true');

		// this.model.updatingPreference = true;
		// this.render();
		// this.feedback.update('update', `Updating subscription to ${this.model.userFacingName}`, this.el);
		// this.callApi(url);
	}

	// update (data) {
	// 	if (data) {
	// 		const timestamp = getTimestamp(new Date);
	// 		const message = `Successfully updated your ${this.model.userFacingName} subscription preference ${timestamp}`;
	// 		this.model = data;
	// 		this.render();
	// 		this.feedback.update('success', message, this.el);
	// 		this.el.setAttribute('aria-busy', 'false');
	// 	}
	// }
	//
	// callApi (url) {
	// 	fetch(url, apiOptions)
	// 		.then(res => {
	// 			if (res.ok) {
	// 				res.json().then(body => this.update(body));
	// 			} else {
	// 				throw new Error('Bad server response');
	// 			}
	// 		})
	// 		.catch(err => {
	// 			this.model.updatingPreference = false;
	// 			this.render();
	// 			this.feedback.update('error', `Something went wrong updating your subscription to ${this.model.userFacingName}. Please try again.`, this.el);
	// 			this.el.setAttribute('aria-busy', 'false');
	// 			throw err;
	// 		});
	// }
}

let containerEl = document.body;
containerEl.querySelectorAll('[data-component="n-newsletter-signup"]')
	.forEach(instanceEl => {
		new Newsletter(instanceEl);
	});
