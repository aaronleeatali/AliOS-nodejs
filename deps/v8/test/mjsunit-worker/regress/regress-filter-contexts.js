// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-filter-contexts.js");
	}
}
function f() { return f.x; }
f.__proto__ = null;
f.prototype = "";

f();
f();
%OptimizeFunctionOnNextCall(f);
f();
