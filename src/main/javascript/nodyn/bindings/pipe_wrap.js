/*
 * Copyright 2014 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var util = require('util');
var Stream = require('nodyn/bindings/stream_wrap').Stream;

function Pipe(ipc) {
  this._pipe = new io.nodyn.pipe.PipeWrap( process._process );
  Stream.call( this, this._pipe );

  this._reader = this._pipe.reader
  this._writer = this._pipe.writer
}

util.inherits(Pipe, Stream);

Pipe.prototype.becomeReader = function() {
  this._pipe.becomeReader();
}

Pipe.prototype.shutdownReader = function() {
  this._pipe.shutdownReader();
}

Pipe.prototype.becomeWriter = function() {
  this._pipe.becomeWriter();
}

Pipe.prototype.shutdownWriter = function() {
  this._pipe.shutdownWriter();
}

Pipe.prototype.bind = function() {
  console.log( "Pipe.bind" );
};

Pipe.prototype.listen = function() {
  console.log( "Pipe.listen" );
};

Pipe.prototype.connect = function() {
  console.log( "Pipe.connect" );
};

Pipe.prototype.open = function(fd) {
  console.log( "Pipe.open" );
};

module.exports.Pipe = Pipe;
