# Dummy-App
Dummy app is a single page that is part of an application for sports enthusiasts to register their names to lists of their favourite sporting activities and what days they are available to participate.

Gulp was used in development to monitor the development files in `/app`. Styling was modified in `./app/stylesheets/styles.scss` with Gulp converting Sass styles to CSS, with auto-prefixer included to add CSS vendor prefixes to allow support for older browsers. Gulp Babel also transpiles `./app/scripts/app.js` to ES5 JavaScript in `./scripts/app.js`. Both `index.html` files will load the page, but the root `index.html` is better supported for older browsers as it is ES5 compliant. 

Any future development work will require the installation of Gulp. 

## Run this locally
Clone this repository in the terminal:
* `git clone git@github.com:105ron/javascript-form.git` 

Open the root `index.html` in the browser of your choice.

## Develop this locally
Clone this repository in the terminal:
* `git clone git@github.com:105ron/javascript-form.git` 

Go to the root of the project install all dependencies with NPM:
* `cd javascript-form`
* `npm install`

After installation, start the gulp server:
* `gulp watch`

Updates can be made to the following development files (Gulp watch task must be running):
* `./app/index.html` 
* `./app/stylesheets/styles.scss`
* `./app/scripts/app.js`

Any changes made to these files will be updated to the development server provided by Gulp, which will update and refresh the browser view at `localhost:3000`.