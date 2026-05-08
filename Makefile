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

coverage:
	yarn test:coverage

dev:
	yarn dev

preview:
	yarn build
	yarn preview

deploy:
	rm -rf dist
	yarn build
	rsync -avz --delete dist/ root@178.208.86.68:/var/www/verbs/