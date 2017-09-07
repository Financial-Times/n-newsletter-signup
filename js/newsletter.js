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
			this.newsletterUserSubscribed = el.dataset.newsletterUserSubscribed === 'true';
			this.newsletterForm = el.querySelector('form');
			this.newsletterId = el.dataset.newsletterId;
			this.newsletterButton = this.el.querySelector('.n-newsletter-signup__submit');
			this.newsletterButtonText = this.el.querySelector('.n-newsletter-signup__buttontext');
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
		this.el.setAttribute('aria-busy', 'true');
		this.feedback.update('update');
		const url = event.target.action;
		const action = url.indexOf('unsubscribe') > -1 ? 'unsubscribe' : 'subscribe';
		this.callApi(url, action);
	}

	update (action) {
		this.render(action);
		this.feedback.update('success');
		this.el.setAttribute('aria-busy', 'false');
	}

	callApi (url, action) {
		fetch(url, apiOptions)
			.then(res => {
				if (res.ok) {
					this.update(action);
					this.newsletterForm.dispatchEvent(new CustomEvent(`newsletter.${action}`, { 'detail': this.newsletterId }));
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

	render (action) {
		let formAction;
		let buttonAriaLabel;
		let buttonTitle;
		let buttonDataTrackable;
		let buttonText;
		let toggleText;

		if (action === 'subscribe') {
			formAction = this.newsletterForm.action.replace('subscribe', 'unsubscribe');
			buttonAriaLabel = this.newsletterButton.getAttribute('aria-label').replace('Subscribe to', 'Unsubscribe from');
			buttonTitle = this.newsletterButton.title.replace('Subscribe to', 'Unsubscribe from');
			buttonDataTrackable = 'newsletter-unsubscribe';
			this.el.setAttribute('data-newsletter-user-is-subscribed', '');
		} else {
			formAction = this.newsletterForm.action.replace('unsubscribe', 'subscribe');
			buttonAriaLabel = this.newsletterButton.getAttribute('aria-label').replace('Unsubscribe from', 'Subscribe to');
			buttonTitle = this.newsletterButton.title.replace('Unsubscribe from', 'Subscribe to');
			buttonDataTrackable = 'newsletter-subscribe';
			this.el.removeAttribute('data-newsletter-user-is-subscribed');
		}

		buttonText = this.newsletterButtonText.innerHTML;
		toggleText = this.newsletterButton.getAttribute('data-newsletter-toggle');

		this.newsletterForm.action = formAction;
		this.newsletterButton.setAttribute('aria-label', buttonAriaLabel);
		this.newsletterButton.title = buttonTitle;
		this.newsletterButton.dataset.trackable = buttonDataTrackable;
		this.newsletterButton.dataset.newsletterToggle = buttonText;
		this.newsletterButtonText.innerHTML = toggleText;
	}

}

module.exports = Newsletter;
