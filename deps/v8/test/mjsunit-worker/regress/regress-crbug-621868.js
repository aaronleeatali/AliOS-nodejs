// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --verify-heap

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-621868.js");
	}
}
function f(a) {  // First parameter is tagged.
  var n = 1 + a;
}

function g() {
  f();
  var d = {x : f()};
  return [d];
}

g();
g();
%OptimizeFunctionOnNextCall(g);
g();
