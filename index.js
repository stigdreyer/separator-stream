var util = require('util');
var Transform = require('stream').Transform;
util.inherits(Separator, Transform);

function Separator(separator, options) {
  if (!(this instanceof Separator))
    return new Separator(separator, options);

  this.separator = separator;
  this.buffer = [];
  Transform.call(this, options);
}

Separator.prototype._transform = function(chunk, encoding, done) {
  var separator = this.separator;

  var chunkString = chunk.toString(encoding);
  if (separator.test(chunkString)) {
    var parts = chunkString.split(separator);
    this.buffer.push(parts.shift());
    this.push(this.buffer.join());
    var nParts = parts.length;
    for (var i = 0; i < nParts -1; i++) {
      this.push(parts.shift());
    }
    this.buffer = [];
    this.buffer.push(parts.shift());
  }

  done();
};

Separator.prototype._flush = function (done) {
  if (this.buffer.length > 0)
    this.push(this.buffer.join());
  delete this.buffer;
  done();
}

module.exports = Separator;
