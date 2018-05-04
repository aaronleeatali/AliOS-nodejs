// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-649078.js");
	}
}
let p = Promise.resolve();
Object.defineProperty(p, 'then', {
  get: () => new Proxy(function() {}, p)
});

new Promise((r) => r(p));
