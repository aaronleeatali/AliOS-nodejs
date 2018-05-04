// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/inlined-array-pop-getter1.js");
	}
}
function foo(a) {
  return a.pop();
}

var a = new Array(4);

assertEquals(undefined, foo(a));
assertEquals(undefined, foo(a));
%OptimizeFunctionOnNextCall(foo);
assertEquals(undefined, foo(a));
Object.prototype.__defineGetter__(0, function() { return 1; });
assertEquals(1, foo(a));
