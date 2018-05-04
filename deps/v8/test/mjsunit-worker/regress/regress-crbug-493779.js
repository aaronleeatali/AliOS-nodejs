// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --enable-slow-asserts

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-493779.js");
	}
}
var s = "\u1234-------";
for (var i = 0; i < 17; i++) {
  s += s;
}
s.replace(/[\u1234]/g, "");
