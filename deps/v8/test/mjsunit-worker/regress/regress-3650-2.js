// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-3650-2.js");
	}
}
var a = {}
var b = {}
a.x = 1;
a.y = 1;
b.x = 1;

function foo(c) {
  var s = 0;
  for (var p in c) { s++; }
  return s;
}

assertEquals(2, foo(a));
assertEquals(1, foo(b));
%OptimizeFunctionOnNextCall(foo);
assertEquals(2, foo(a));
assertEquals(1, foo(b));
