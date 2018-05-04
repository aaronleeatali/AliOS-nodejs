// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-349079.js");
	}
}
function assertEquals(expected, found) {
  return found === expected;
};
%NeverOptimizeFunction(assertEquals);

function crash() {
  var a = 1;
  var b = -0;
  var c = 1.5;
  assertEquals(b, Math.max(b++, c++));
  assertEquals(c, Math.min(b++, c++));
  assertEquals(b, Math.max(b++, a++));
}
crash();
crash();
%OptimizeFunctionOnNextCall(crash);
crash();
