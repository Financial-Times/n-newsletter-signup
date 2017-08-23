# n-newsletter-signup

n-newsletter-signup is a component that displays one-click signup form to newsletters.

## Install

Add the component to bower.json

Run `bower install n-newsletter-signup --save`

Add the following line to your main sass file: `@import "n-newsletter-signup/main";`

## Usage

Client-side
```javascript
import { init as newsletterSignupInit } from './components/newsletter-signup';
newsletterSignupInit();
```
You may need to reset
```html

```

n-newsletter-signup requires at least the following data:

 * `unsubscribeAction`
 * `subscribeAction`
 * `id`
 * `name``
 * `subscriptionLevel`
 * `inactive`
 * `description`
 * `frequency`
 * `userIsSubscribed`

 * `isPremium`
 * `referenceId`

Please view the source for more information.

##Demo page
`$ make demo`: Serves examples of the component locally (`http://localhost:5005`), using dummy data and in isolation from an app.

This is done on a simple express app which renders a single demo page that calls the partials to exhibit, populating them with data from a fixture.

##Pa11y
`$ make a11y`: Serves page of demo components, on which it runs [Pa11y](http://pa11y.org/) accessibility tests (errors flagging up accessibility infringements), which will also be run as part of the Continuous Integration (CI) process.
