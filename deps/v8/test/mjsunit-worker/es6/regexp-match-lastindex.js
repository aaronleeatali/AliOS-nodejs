// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests that lastIndex of a global RegExp is overwritten as per
// ECMA-262 6.0 21.2.5.6 step 8.c.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/es6/regexp-match-lastindex.js");
	}
}
var global = /./g;
global.lastIndex = { valueOf: function() { assertUnreachable(); } };
"x".match(global);
assertEquals(0, global.lastIndex);
