// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-590989-1.js");
	}
}
var o = {}
var p = {foo: 1.5}

function g(x) { return x.foo === +x.foo; }

assertEquals(false, g(o));
assertEquals(false, g(o));
%OptimizeFunctionOnNextCall(g);
assertEquals(false, g(o));  // Still fine here.
assertEquals(true, g(p));
%OptimizeFunctionOnNextCall(g);
assertEquals(false, g(o));  // Confused by type feedback.
