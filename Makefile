# n-gage bootstrapping logic
node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk


IGNORE_A11Y = true

demo-build:
	@rm -rf bower_components/n-newsletter-signup
	@mkdir bower_components/n-newsletter-signup
	@cp -r templates/ bower_components/n-newsletter-signup/templates/
	@webpack
	@node-sass demos/src/main.scss public/main.css --include-path bower_components
	@$(DONE)

demo: demo-build
	@node demos/app

a11y: demo-build
	@node .pa11yci.js
	@PA11Y=true node demos/app
	@$(DONE)

test: verify a11y
