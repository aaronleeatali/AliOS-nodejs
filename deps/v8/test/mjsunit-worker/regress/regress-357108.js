// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//
// Flags: --typed-array-max-size-in-heap=64

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-357108.js");
	}
}
function TestArray(constructor) {
  function Check(a) {
    a[0] = "";
    assertEquals(0, a[0]);
    a[0] = {};
    assertEquals(0, a[0]);
    a[0] = { valueOf : function() { return 27; } };
    assertEquals(27, a[0]);
  }
  Check(new constructor(1));
  Check(new constructor(100));
}

TestArray(Uint8Array);
