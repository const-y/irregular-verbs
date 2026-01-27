install: 
	yarn

ci: 
	yarn install --frozen-lockfile
	yarn playwright install --with-deps

lint:
	npx eslint .

test-watch:
	yarn test

build:
	yarn build

test:
	yarn test:coverage

dev:
	yarn dev

preview:
	yarn build
	yarn preview