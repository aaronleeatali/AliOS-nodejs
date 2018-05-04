// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --stack-size=150

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-360733.js");
	}
}
function f(a) {
  f(a + 1);
}

Error.__defineGetter__('stackTraceLimit', function() { });
try {
  f(0);
} catch (e) { }
