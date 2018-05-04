// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/regress-5074.js");
	}
}
var s = [,0.1];

function foo(a, b) {
  var x = s[a];
  s[1] = 0.1;
  return x + b;
}

assertEquals(2.1, foo(1, 2));
assertEquals(2.1, foo(1, 2));
%OptimizeFunctionOnNextCall(foo);
assertEquals("undefined2", foo(0, "2"));
