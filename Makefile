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

deploy:
	yarn deploy

test-coverage:
	yarn test --coverage .