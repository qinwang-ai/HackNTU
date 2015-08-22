TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REGISTRY = http://registry.npmjs.com
REPORTER = spec
TIMEOUT = 3000
MOCHA_OPTS =

start:
	@node --harmony ./index.js

dev:
	@node-dev --harmony ./index.js

jshint:
	@./node_modules/.bin/jshint .

.PHONY: start jshint dev