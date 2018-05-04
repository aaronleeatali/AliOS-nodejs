// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Regression test for hitting a DCHECK; if we just get a syntax error, it's ok.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-708598.js");
	}
}
assertThrows(`function lazy_does_not_compile(x) {
                break;
              }
              new lazy_does_not_compile();`, SyntaxError);
