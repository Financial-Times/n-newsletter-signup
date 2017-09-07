# n-newsletter-signup

## Styling Properties

*  `theme`
    *  Currently only `dark`. Adds a class modifier that can override the default style. `dark` allows for better usage on a dark background.
*  `isStandalone`
    *  Shows the email icon in the header and `Email` suffix next to the newsletter name.
*  `isPremium`
    *  Adds a label indicating the newsletter is a premium only newsletter.
*  `userIsSubscribed`
    *  Indicates whether the user is already subscribed to the given newsletter.
*  `subscribeText`
    *  The text shown on the button when a user is not subscribed to the newsletter.
*  `unsubscribeText`
    *  Opposite of above.

## Other Properties

*  `name`
    *  Display name for the newsletter.
*  `description`
    *  Information blurb.
*  `frequency`
    *  How often the newsletter is issued (`DAILY / WEEKLY` etc).
*  `subscribeAction`
    *  URL for submitting to when the user is not subscribed and the button is clicked.
*  `unsubscribeAction`
    *  Opposite of above.
