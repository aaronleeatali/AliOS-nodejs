// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-v8-5254-2.js");
	}
}
var foo = (function() {
  "use asm";
  var a = new Uint8Array(2);
  a[0] = 128;
  a[1] = 127;

  function foo() {
    var x = a[0]|0;
    var y = a[1]|0;
    if (x < 0) x = 4294967296 + x|0;
    if (y < 0) y = 4294967296 + y|0;
    return x >= y;
  }

  return foo;
})();

assertTrue(foo());
assertTrue(foo());
%OptimizeFunctionOnNextCall(foo);
assertTrue(foo());
