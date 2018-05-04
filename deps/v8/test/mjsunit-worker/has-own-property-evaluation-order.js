// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker//has-own-property-evaluation-order.js");
	}
}
function MyError() {}

assertThrows(function() {
  Object.prototype.hasOwnProperty.call(null, {
    toString() {
      throw new MyError();
    }
  });
}, MyError);
