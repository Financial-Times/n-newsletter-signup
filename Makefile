# n-gage bootstrapping logic
node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk


IGNORE_A11Y = true

demo-build:
	@rm -rf node_modules/@financial-times/n-newsletter-signup
	@mkdir node_modules/@financial-times/n-newsletter-signup
	@cp -r templates node_modules/@financial-times/n-newsletter-signup/templates/
	@sass demos/src/main.scss public/main.css --load-path node_modules
	@webpack
	@$(DONE)

demo: demo-build
	@node demos/app

a11y: demo-build
	@node .pa11yci.js
	@PA11Y=true node demos/app
	@$(DONE)

test: verify a11y
