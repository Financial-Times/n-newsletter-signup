# n-newsletter-signup [![CircleCI](https://circleci.com/gh/Financial-Times/n-newsletter-signup.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-newsletter-signup)

n-newsletter-signup is a component that displays one-click signup form to newsletters.

## Install

Add the component to package.json:

`npm install n-newsletter-signup --save`

Add the following line to your main sass file:

`@import "n-newsletter-signup/main";`


## Usage


```javascript
// Client-side
import { init as newsletterSignupInit } from 'n-newsletter-signup';
newsletterSignupInit();
```
---
:rotating_light:
**For the newsletter title, `<h2>` tag is used.**
**This may cause a problem on your app with the accessibility!!** :rotating_light:

---

#### n-newsletter-signup template requires the following data:
	* `id`
	* `name`
	* `isPremium`
	* `unsubscribeAction`: url to unsubscribe via myft api

		e.g. `/__myft/api/alerts/no-user-provided/newsletters/${newsletter.id}/unsubscribe`
	* `subscribeAction`: url to subscribe via myft api

		e.g. `/__myft/api/alerts/no-user-provided/newsletters/${newsletter.id}/subscribe`
	* `inactive`
	* `description`
	* `subscriptionLevel`
	* `frequency`
	* `userIsSubscribed`
	* `referenceId`: to jump to the newsletter
	* `imageUrl` - (Optional for newsletters with images)

:mag: Please view the source for more information.

## CustomEvent
`newsletter.subscribe` or `newsletter.unsubscribe` event is dispatched by the action when users click the button

## Local storage
Subscribed time is stored using `superstore-sync`
```js
// js/newsletter.js
store.set(`n-newsletter-signup.${this.newsletterId}.subscribedTime`, Date.now());
```

## Demo page
`$ npm run demo`: Serves examples of the component locally (`http://localhost:5005`), using dummy data and in isolation from an app.

This is done on a simple express app which renders a single demo page that calls the partials to exhibit, populating them with data from a fixture.

## Jest & Pa11y
`$ npm run test`: Runs the Jest test suite. This includes a [Pa11y](http://pa11y.org/) accessibility test against the html templates (errors flagging up accessibility infringements), which will also be run as part of the Continuous Integration (CI) process.
