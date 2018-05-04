// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-reset-dictionary-elements.js");
	}
}
var a = [];
a[10000] = 1;
a.length = 0;
a[1] = 1;
a.length = 0;
assertEquals(undefined, a[1]);

var o = {};
Object.freeze(o);
assertEquals(undefined, o[1]);
