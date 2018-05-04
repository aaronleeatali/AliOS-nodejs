// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//
// MODULE

// Make sure the generator resume function doesn't show up in the stack trace.
if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker//modules-error-trace.js");
	}
}
const stack = (new Error).stack;
assertEquals(2, stack.split(/\r\n|\r|\n/).length);
