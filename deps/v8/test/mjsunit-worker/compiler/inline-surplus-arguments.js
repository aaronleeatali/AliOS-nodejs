// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/inline-surplus-arguments.js");
	}
}
var x = 42;
function foo(s) { return x + s; }
function bar(s, t) { return foo(s, t, 13); }

%OptimizeFunctionOnNextCall(bar);
assertEquals(42 + 12, bar(12));
