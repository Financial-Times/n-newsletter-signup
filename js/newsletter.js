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
			this.newsletterButton = this.el.querySelector('.n-newsletter-signup__submit');
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

	update () {
		this.render();
		this.feedback.update('success');
		this.el.setAttribute('aria-busy', 'false');
	}

	callApi (url) {
		fetch(url, apiOptions)
			.then(res => {
				if (res.ok) {
					this.update();
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

	render () {
		let formAction;
		let buttonAriaLabel;
		let buttonTitle;
		let buttonDataTrackable;
		let buttonText;

		if (this.newsletterForm.action.indexOf('unsubscribe') > -1) {
			formAction = this.newsletterForm.action.replace('unsubscribe', 'subscribe');
			buttonAriaLabel = this.newsletterButton.getAttribute('aria-label');
			buttonTitle = this.newsletterButton.title.replace('Unsubscribe from', 'Subscribe to');
			buttonDataTrackable = 'newsletter-subscribe';
			buttonText = this.newsletterButton.innerHTML.replace(
				'Unsubscribe<span class="n-util-visually-hidden">&nbsp;from',
				'One-Click Sign Up<span class="n-util-visually-hidden">&nbsp;to'
			);
		} else {
			formAction = this.newsletterForm.action.replace('subscribe', 'unsubscribe');
			buttonAriaLabel = this.newsletterButton.getAttribute('aria-label').replace('Subscribe to', 'Unsubscribe from');
			buttonTitle = this.newsletterButton.title.replace('Subscribe to', 'Unsubscribe from');
			buttonDataTrackable = 'newsletter-unsubscribe';
			buttonText = this.newsletterButton.innerHTML.replace(
				'One-Click Sign Up<span class="n-util-visually-hidden">&nbsp;to',
				'Unsubscribe<span class="n-util-visually-hidden">&nbsp;from'
			);

		}

		this.newsletterForm.action = formAction;
		this.newsletterButton.setAttribute('aria-label', buttonAriaLabel);
		this.newsletterButton.title = buttonTitle;
		this.newsletterButton.dataset.trackable = buttonDataTrackable;
		this.newsletterButton.innerHTML = buttonText;
	}

}

module.exports = Newsletter;
