// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-5275-2.js");
	}
}
function foo(x) {
  var a = new Array(1);
  a[0] = x;
  return a;
}

assertEquals([1], foo(1));
assertEquals([1], foo(1));
%OptimizeFunctionOnNextCall(foo);
assertEquals([1], foo(1));
Object.prototype.__defineSetter__("0", function() {});
assertEquals([undefined], foo(1));
