// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/es6/regress/regress-4417.js");
	}
}
var arr = [1, 2, 3];
assertEquals({arr: [1, 2, 3]}, {arr: [...arr]});
assertEquals([[1, 2, 3]], [[...arr]]);

assertEquals({arr: [6, 5, [1, 2, 3]]}, {arr: [6, 5, [...arr]]});
assertEquals([8, 7, [6, 5, [1, 2, 3]]], [8, 7, [6, 5, [...arr]]]);
