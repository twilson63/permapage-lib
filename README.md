# Permapage Library

This library handles the encoding and decoding of a permapage for application management. The gist is that this library takes a permapage model and generates an html page with the model embedded in the meta source tag. Then it can take a permapage generated html page and generate a permapage model. This manages the complexity of serializing and deserializing the permapage object, so that applications can focus on user experience.

## How it works

It uses an AST to take a permapage model and generate an html page, packing the meta source tag with the compressed serialized version of the model. Then it deserializes to the model from an html page using the rehype parser.

## Install

```sh
npm install https://lib_pages.g8way.io
```

## Test

```sh
npm test
```

## Usage

```js
import Pages from '../src/index.js'

const pages = Pages.init({})
```

generateHTML 

```js
const html = await pages.generateHTML(_page)
```

extractModel

```js
const output = await pages.extractModel(html)
```



