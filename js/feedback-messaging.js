import getTimestamp from './timestamp';

export default class Feedback {
	constructor (parent, name, id) {
		this.parentHtml = parent;
		this.html = document.createElement('p');
		this.state = 'default';
		this.name = name;
		this.id = id;
		this.append(parent);
	}

	defaultAttributes () {
		this.html.dataset.component = 'feedback';
		this.html.setAttribute('aria-live', 'polite');
		this.html.setAttribute('aria-atomic', 'true');
		this.html.classList.add('n-newsletter-signup__feedback');
		this.html.classList.add('n-newsletter-signup__feedback--hidden');
		this.html.id = `feedback-message__newsletter-${this.id}`;
	}

	updatePresentation () {
		this.html.classList.add(`n-newsletter-signup__feedback--${this.state}`);

		if (this.state === 'error') {
			this.html.classList.remove('n-newsletter-signup__feedback--hidden');
		}
	}

	updateMessage (message) {
		this.html.innerHTML = message;
	}

	append () {
		this.defaultAttributes();
		this.parentHtml.appendChild(this.html);
	}

	update (state) {
		this.state = state || this.state;
		let message = this.setMessage(state);

		if (!message) {
			return;
		}

		this.updatePresentation();
		this.updateMessage(message);
	}

	setMessage (state) {
		const timestamp = getTimestamp(new Date);
		switch (state) {
			case 'update':
				return `Updating subscription to ${this.name}`;
				break;
			case 'success':
				return `Successfully updated your ${this.name} subscription preference ${timestamp}`;
				break;
			case 'error':
				return `Something went wrong updating your subscription to ${this.name}. Please try again.`;
				break;
			default:
				return false;
		}
	}

}
