# separator-stream

`separator-stream` is a transform stream. When you create it, you
have to pass a regular expression (mandatory parameter), then you
pipe a regular stream to it, and it should emit `data` events for
every part it got.

## Installation

    npm install --save separator-stream

## Usage

```js
var fs = require('fs');
var Separator = require('separator-stream');

var inputStream = fs.createReadStream('./file');
var separator = new Separator(/splitHere/);
var separated = inputStream.pipe(separator);

separated.on('data', onParts);
function onParts(part) {
  // tadaaa
} 
```
