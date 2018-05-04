// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/es6/regress/regress-6098.js");
	}
}
const fn = (c) => {
  let d = [1, 2], x = [3, 4],
      e = null,
      f = null;
  0 < c.getIn(['a']) ? [e, f] = d : [e, f] = x;
  return [e, f];
};

assertEquals([3, 4], fn({ getIn(x) { return false; } }));
assertEquals([1, 2], fn({ getIn(x) { return true; } }));
