// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --opt --allow-natives-syntax --no-always-opt

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/ignition/throw-if-not-hole.js");
	}
}
class A {
  constructor() { }
}
class B extends A {
  constructor(call_super) {
    super();
    if (call_super) {
      super();
    }
  }
}

test = new B(0);
test = new B(0);
assertThrowsEquals(() => {new B(1)}, ReferenceError());
assertThrowsEquals(() => {new B(1)}, ReferenceError());
%OptimizeFunctionOnNextCall(B);
test = new B(0);
assertOptimized(B);
// Check that hole checks are handled correctly in optimized code.
assertThrowsEquals(() => {new B(1)}, ReferenceError());
assertOptimized(B);
