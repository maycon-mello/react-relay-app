# React App Scripts [![npm version](https://badge.fury.io/js/react-app-scripts.svg)](https://badge.fury.io/js/react-app-scripts) [![Build Status](https://api.travis-ci.org/maycon-mello/react-app-scripts.svg?branch=master)](https://travis-ci.org/maycon-mello/react-app-scripts)
Run, build and test react applications.

## Relay and GraphQL support
Babel relay plugin is included to transpile relay queries

## What is included on react app scripts?
 - Webpack 2
 - Webpack Dev Server
 - [Happypack](https://github.com/amireh/happypack)
 - Babel React and ES6 loaders
 - [React Hot Loader 3](https://github.com/gaearon/react-hot-loader)
 - Relay/GraphQL support
 - Flowtype suport
 - Run tests with Mocha

## Serve React application
There are two options when running React App Scripts.
### With CLI
Create a .scriptsrc:
```javascript
{
  // Global configuration, common to all scripts
  // Your application entry point
  "entry": "./src/main.js",
  // Serve script configuration
  "serve": {
    "port": 3000,
    // Static files to be served by express
    // Put here your index.html
    "staticsPath": "./public",
    // Path to webpack serve the bundle.js file
    "publicPath": "/build/",
    // You application source path to watch for file changes
    "appSrc": "./src"
  }
}
```
Add the script in on package.json:
```javascript
{
  // Global configuration, common to all scripts
 "scripts": {
    "serve": "./node_modules/.bin/react-app-scripts serve"
 }
}
```
### With Javascript
Create a javascript file to call de serve method:
```javascript
const app = require('react-app-scripts');

app.serve({
  port: 3000,
  // Your application root path
  // All relative paths will be resolved from this path
  rootPath: __dirname,
  // Static files to be served by express
  // Put here your index.html
  staticsPath: './public',
  // Path to webpack serve the bundle.js file
  publicPath: '/build/',
  // Your application entry point
  entry: './src/main.js',
  // You application source path to watch for file changes
  appSrc: './src',
});

```

## React hot loader
React App Scripts include [React Hot Loader 3](https://github.com/gaearon/react-hot-loader)
This is disabled by default, see the code below to enable it.

```javascript
const app = require('react-app-scripts');

app.serve({
  port: 3000,
  rootPath: __dirname,
  staticsPath: './public',
  publicPath: '/build/',
  entry: './src/main.js',
  appSrc: './src',
  // Enable React Hot Loading 3
  reactHot: {
    // This property is optional, the default value is true
    enabled: true, // It is usefull to turn hot loading disabled temporarly
    // React hot loading will render your app inside this element
    renderWrapperId: 'wrapper',
  },
});


```

Your main.js file should look like this:

```javascript
import React from 'react';

const app = <div>My app<div>

// React hot loading will automatically render your app inside the renderWrapperId element

/* 
 * You need to export your app because the entire application
 * will be wrapped by a react loader provider.
 */
export default app;

```

## Serve React/Relay application
React App Scripts do all the necessary tasks to run Relay applications.
You just need to inform your schema file and it will do the dirty work for you.

Every time you update your schema, a new schema.json file will be generated. Webpack will rebuild your application with the new schema and the page will be reloaded.

```javascript
const app = require('react-app-scripts');

app.serve({
  port: 3000,
  rootPath: __dirname,
  staticsPath: './public',
  publicPath: '/build/',
  entry: './src/main.js',
  appSrc: './src',
  graphql: {
    schema: {
      entry: './src/schema',
      json: './tools/schema/schema.json',
      graphql: './tools/schema/schema.graphql',
      watch: './src/schema',
    },
  },
  proxy: {
    '/**': {
      target: 'http://myapp.com/',
      secure: false
    },
  },
});

```

## Build
Build your application in one js file, applying webpack optimizations on it.

### CLI usage

.scriptsrc:

```javascript
{
  "entry": "./src/main.js",
  "appSrc": "./src",
  "schema": {
    "entry": "./src/schema",
    "json": "./tools/schema/schema.json",
    "graphql": "./tools/schema/schema.graphql"
  },
  "build": {
    "path": "./",
    "filename": "dist.min.js"
  }
}

```

package.json:

```javascript
{
  "build": "./node_modules/.bin/react-app-scripts build"
}

```

### Javascript usage:

```javascript
const app = require('react-app-scripts');

app.build({
  rootPath: __dirname,
  entry: "./src/main.js",
  appSrc: "./src",
  path: "./",
  filename: "dist.min.js",
  schema: {
    entry: "./src/schema",
    json: "./tools/schema/schema.json",
    graphql: "./tools/schema/schema.graphql",
  },
});

```

## What should be done yet
 - GraphQL Server support
 - GraphiQL client
 - Less, Sass and postcss support
 - Improve Webpack to deal with code spliting and multiple entries
