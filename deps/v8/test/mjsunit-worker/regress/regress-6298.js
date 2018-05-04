// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-6298.js");
	}
}
function Module(stdlib, imports, buffer) {
  "use asm";
  function f() {
    return (281474976710655 * 1048575) | 0;
  }
  return { f:f };
}
var m = Module(this);
assertEquals(-1048576, m.f());
assertFalse(%IsAsmWasmCode(Module));
