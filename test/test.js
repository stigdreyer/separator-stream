var test = require('tap').test;
var fs = require('fs');
var Separator = require('../');

var mock = __dirname+'/mocks/buffer.html';
var separator = /\<p\>/g;

var ocurrences = fs.readFileSync(mock, {
  encoding: 'utf8'
}).match(separator).length;


test('separates <p>', function (t) {
  var inputStream = fs.createReadStream(mock, {
    encoding: 'utf8'
  });

  var separatorStream = new Separator(separator);
  var separated = inputStream.pipe(separatorStream);

  var nParts = 0;
  separated.on('data', function (data) {
    nParts++;
  });
  separated.on('end', function () {
    t.equal(nParts - 1, ocurrences, 'Has '+nParts+' parts');
    t.end();
  });
});
