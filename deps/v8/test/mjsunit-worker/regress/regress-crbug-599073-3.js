// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-599073-3.js");
	}
}
Object.defineProperty(Number.prototype, "v", {get:constructor});

function foo(b) { return b.v; }

foo(2);
foo(3);
foo(4);
