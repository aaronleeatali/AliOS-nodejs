// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/deopt-accessors2.js");
	}
}
var o = {v:1};
var deopt = false;

Object.defineProperty(o, "x", {
  get: function() { return this.v; },
  set: function(v) {
    this.v = v;
    if (deopt) {
      %DeoptimizeFunction(foo);
    }
  }
});

function foo(o) {
  return ++o.x;
}

assertEquals(2, foo(o));
assertEquals(3, foo(o));
%OptimizeFunctionOnNextCall(foo);
deopt = true;
assertEquals(4, foo(o));
