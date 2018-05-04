// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/regress-444508.js");
	}
}
(function Module(stdlib, foreign, heap) {
  "use asm";
  // This is not valid asm.js, but should nevertheless work.
  var MEM = new Uint8ClampedArray(heap);
  function foo(i) { MEM[0] = 1; }
  return {foo: foo};
})(this, {}, new ArrayBuffer(64 * 1024)).foo();
