// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-594955.js");
	}
}
function g(s, key) { return s[key]; }

assertEquals(g(new String("a"), "length"), 1);
assertEquals(g(new String("a"), "length"), 1);
assertEquals(g("a", 32), undefined);
assertEquals(g("a", "length"), 1);
assertEquals(g(new String("a"), "length"), 1);
