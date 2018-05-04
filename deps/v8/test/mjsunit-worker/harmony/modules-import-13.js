// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --harmony-dynamic-import

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/harmony/modules-import-13.js");
	}
}
ran = false;
async function test1() {
  try {
    let x = { toString() { return 'modules-skip-1.js' } };
    let namespace = await import(x);
    let life = namespace.life();
    assertEquals(42, life);
    ran = true;
  } catch(e) {
    %AbortJS('failure: '+ e);
  }
}

test1();
%RunMicrotasks();
assertTrue(ran);

ran = false;
async function test2() {
  try {
    let x = { get toString() { return () => 'modules-skip-1.js' } };
    let namespace = await import(x);
    let life = namespace.life();
    assertEquals(42, life);
    ran = true;
  } catch(e) {
    %AbortJS('failure: '+ e);
  }
}

test2();
%RunMicrotasks();
assertTrue(ran);
