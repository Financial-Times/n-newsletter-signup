class Feedback {
	constructor (id) {
		this.html = document.createElement('p');
		this.state = 'default';
		this.id = id;
	}

	static defaultAttributes (html, id) {
		html.dataset.component = 'feedback';
		html.setAttribute('aria-live', 'polite');
		html.setAttribute('aria-atomic', 'true');
		html.classList.add('n-newsletter-signup__feedback');
		html.classList.add('n-newsletter-signup__feedback--hidden');
		html.id = id;
	}

	static updatePresentation (html, state) {
		html.classList.add(`n-newsletter-signup__feedback--${state}`);

		if (state === 'error') {
			html.classList.remove('n-newsletter-signup__feedback--hidden');
		}
	}

	static updateMessage (html, message) {
		html.innerHTML = message;
	}

	append (parent) {
		this.parent = parent;

		if (!this.parent) {
			return;
		}

		//TODO ask what this lines are doing
		if (this.html.parentNode === this.parent) {
			this.parent.removeChild(this.html);
		}

		Feedback.defaultAttributes(this.html, this.id);
		this.parent.appendChild(this.html);
	}

	update (state, message, updatedParent) {
		this.state = state || this.state;
		this.message = message;
		this.parent = updatedParent || this.parent;

		if (!this.parent || !this.message) {
			return;
		}

		if (updatedParent) {
			this.parent.appendChild(this.html);
		}

		Feedback.updatePresentation(this.html, this.state);
		Feedback.updateMessage(this.html, this.message);
	}
}

module.exports = Feedback;
