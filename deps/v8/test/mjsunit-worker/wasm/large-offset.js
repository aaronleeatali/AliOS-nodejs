// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/wasm/large-offset.js");
	}
}
load("test/mjsunit/wasm/wasm-constants.js");
load("test/mjsunit/wasm/wasm-module-builder.js");

function testGrowMemoryOutOfBoundsOffset() {
  print("testGrowMemoryOutOfBoundsOffset2");
  var builder = new WasmModuleBuilder();
  builder.addMemory(16, 128, false);
  builder.addFunction("main", kSig_v_v)
      .addBody([
          kExprI32Const, 20,
          kExprI32Const, 29,
          kExprGrowMemory, kMemoryZero,
          // Assembly equivalent Move <reg>,0xf5fffff
          // with wasm memory reference relocation information
          kExprI32StoreMem, 0, 0xFF, 0xFF, 0xFF, 0x7A
          ])
      .exportAs("main");
  var module = builder.instantiate();
  assertTraps(kTrapMemOutOfBounds, module.exports.main);
}

testGrowMemoryOutOfBoundsOffset();
