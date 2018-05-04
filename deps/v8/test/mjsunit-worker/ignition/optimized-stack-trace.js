// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

// Test that PC in optimized frame would correctly translate into
// unoptimized frame when collecting stack trace.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/ignition/optimized-stack-trace.js");
	}
}
function f() {
  return new Error().stack;
}

function g(x) {
  return f();
}

g();
g();
%OptimizeFunctionOnNextCall(g);
print(g());
assertTrue(/g \(.*?\.js:20:10\)/.test(g()));
