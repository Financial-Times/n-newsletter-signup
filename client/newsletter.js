// const session = require('next-session-client');
const Feedback = require('./feedback-messaging');
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
			this.newsletterName = el.dataset.newsletterName;
			this.newsletterForm = el.querySelector('form');
			this.newsletterId = el.dataset.newsletterId;
			this.feedback = new Feedback(this.newsletterForm, this.newsletterName, this.newsletterId);
			this.init();
	}

	init () {
		this.newsletterForm.addEventListener('submit', (event) => {
			event.preventDefault();
			this.handleSubmit(event);
		});
	}

	handleSubmit (event) {
		event.preventDefault();
		const url = event.target.action;
		this.el.setAttribute('aria-busy', 'true');
		this.feedback.update('update');
		this.callApi(url);
	}

	update (data) {
		if (data) {
			this.render(data);
			this.feedback.update('success');
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
				this.feedback.update('error');
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

		if (data.userIsSubscribed) {
			formAction = data.unsubscribeAction;
			buttonAriaLabel = `Unsubscribe from ${data.name}`;
			buttonTitle = `Unsubscribe from ${data.name}`;
			buttonDataTrackable = 'newsletter-unsubscribe';
			buttonText = `Unsubscribe<span class="n-util-visually-hidden">&nbsp;from ${data.name}</span>`;
		} else {
			formAction = data.subscribeAction;
			buttonAriaLabel = `Subscribe to ${data.name}`;
			buttonTitle = `Subscribe to ${data.name}`;
			buttonDataTrackable = 'newsletter-subscribe';
			buttonText = `One-Click Sign Up<span class="n-util-visually-hidden">&nbsp;to ${data.name}</span>`;
		}

		this.newsletterForm.action = formAction;
		let newsletterButton = this.el.querySelector('.n-newsletter-signup__submit');
		newsletterButton.setAttribute('aria-label', buttonAriaLabel);
		newsletterButton.title = buttonTitle;
		newsletterButton.dataset.trackable = buttonDataTrackable;
		newsletterButton.innerHTML = buttonText;
	}

}

module.exports = Newsletter;
