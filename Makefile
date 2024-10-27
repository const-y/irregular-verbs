install: 
	yarn

ci: 
	yarn install

lint:
	npx eslint .

test:
	yarn test

build:
	yarn build

test-coverage:
	yarn test --coverage .

dev:
	yarn start