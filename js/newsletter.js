import { local as store } from 'superstore-sync';
import { broadcast } from 'n-ui-foundations';
import getToken from 'n-myft-ui/myft/ui/lib/get-csrf-token';
import Feedback from './feedback-messaging';

export default class Newsletter {
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
		this.el.setAttribute('aria-busy', 'true');
		this.feedback.update('update');
		const url = event.target.action;
		const action = url.indexOf('unsubscribe') > -1 ? 'unsubscribe' : 'subscribe';

		this.callApi(url, action)
			.catch(error => broadcast('oErrors.log', {
				error,
				info: {
					reason: 'Failed newsletter signup'
				}
			}));
	}

	update (action) {
		this.render(action);
		this.feedback.update('success');
		this.el.setAttribute('aria-busy', 'false');
	}

	callApi (url, action) {
		const csrfToken = getToken();
		const apiOptions = {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json'
			},
			body: JSON.stringify({token: csrfToken})
		};

		return fetch(url, apiOptions)
			.then(res => {
				if (res.ok) {
					this.update(action);
					this.newsletterForm.dispatchEvent(new CustomEvent(`newsletter.${action}`, { 'detail': this.newsletterId }));
					if (action === 'subscribe') {
						store.set(`n-newsletter-signup.${this.newsletterId}.subscribedTime`, Date.now());
					}
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

		if (action === 'subscribe') {
			formAction = this.newsletterForm.action.replace('subscribe', 'unsubscribe');
			buttonAriaLabel = this.newsletterButton.getAttribute('aria-label').replace('Subscribe to', 'Unsubscribe from');
			buttonTitle = this.newsletterButton.title.replace('Subscribe to', 'Unsubscribe from');
			buttonDataTrackable = 'newsletter-unsubscribe';
			buttonText = this.newsletterButton.innerHTML.replace(
				'One-Click Sign Up',
				'Subscribed'
			);
			this.el.classList.add('n-newsletter-signup--subscribed');
		} else {
			formAction = this.newsletterForm.action.replace('unsubscribe', 'subscribe');
			buttonAriaLabel = this.newsletterButton.getAttribute('aria-label');
			buttonTitle = this.newsletterButton.title.replace('Unsubscribe from', 'Subscribe to');
			buttonDataTrackable = 'newsletter-subscribe';
			buttonText = this.newsletterButton.innerHTML.replace(
				/(Subscribed)|(Unsubscribe)/,
				'One-Click Sign Up'
			);
			this.el.classList.remove('n-newsletter-signup--subscribed');
		}

		this.newsletterForm.action = formAction;
		this.newsletterButton.setAttribute('aria-label', buttonAriaLabel);
		this.newsletterButton.title = buttonTitle;
		this.newsletterButton.dataset.trackable = buttonDataTrackable;
		this.newsletterButton.innerHTML = buttonText;
	}

}
