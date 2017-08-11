// const session = require('next-session-client');
const Feedback = require('./feedback-messaging');
const getTimestamp = require('./timestamp');
const apiOptions = {
	method: 'POST',
	credentials: 'same-origin',
	headers: {
		accept: 'application/json'
	}
};

class Newsletter {
	constructor (el) {
			this.el = el;
			this.form = this.el.querySelector('[data-component="n-newsletter-signup-form"]');
			this.options = {
					newsletterId: el.dataset.newsletterId
			};
			this.feedback = new Feedback(`feedback-message__newsletter`);
			this.init(this.el);
			this.feedback.append(this.el.querySelector('form'));
	}

	init (el) {
		this.form.addEventListener('submit', (event) => {
			event.preventDefault();
			this.handleSignup(event);
		});
	}

	handleSignup (event) {
		event.preventDefault();
		const url = event.target.action;
		this.el.setAttribute('aria-busy', 'true');
		this.feedback.update('update', `Updating subscription to ${this.el.dataset.newsletterName}`, this.el);
		this.callApi(url);
	}

	update (data) {
		if (data) {
			const timestamp = getTimestamp(new Date);
			const message = `Successfully updated your ${this.el.dataset.newsletterName} subscription preference ${timestamp}`;
			this.render(data);
			this.feedback.update('success', message, this.el);
			this.el.setAttribute('aria-busy', 'false');
		}
	}

	callApi (url) {
		fetch(url, apiOptions)
			.then(res => {
				if (res.ok) {
					res.json().then(body => this.update(body));
				} else {
					throw new Error('Bad server response');
				}
			})
			.catch(err => {
				this.feedback.update('error', `Something went wrong updating your subscription to ${this.el.dataset.newsletterName}. Please try again.`, this.el);
				this.el.setAttribute('aria-busy', 'false');
				throw err;
			});
	}

	render (data) {
		let formAction;
		let buttonAriaLabel;
		let buttonTitle;
		let buttonDataTrackable;
		let buttonText;
		let buttonEl = this.el.querySelector('.n-newsletter-signup-button');

		if (data.userIsSubscribed) {
			formAction = data.unsubscribeAction;
			buttonAriaLabel = `Unsubscribe from ${data.name}`;
			buttonTitle = `Unsubscribe from ${data.name}`;
			buttonDataTrackable = 'newsletter-unsubscribe';
			buttonText = `Unsubscribe<span class="n-util-visually-hidden">&nbsp;from ${data.name}</span>`;
		} else {

		}
		this.form.action = formAction;
		buttonEl.setAttribute('aria-label', buttonAriaLabel);
		buttonEl.title = buttonTitle;
		buttonEl.dataset.trackable = buttonDataTrackable;
		buttonEl.innerHTML = buttonText;
	}

}

module.exports = Newsletter;
