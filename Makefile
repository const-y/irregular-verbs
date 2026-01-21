install: 
	yarn

ci: 
	yarn install --frozen-lockfile
	yarn playwright install --with-deps

lint:
	npx eslint .

test:
	yarn test

build:
	yarn build

test-coverage:
	yarn test --coverage .

dev:
	yarn dev