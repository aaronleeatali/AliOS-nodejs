// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/es6/proxies-revocable.js");
	}
}
traps = [
    "getPrototypeOf", "setPrototypeOf", "isExtensible", "preventExtensions",
    "getOwnPropertyDescriptor", "has", "get", "set", "deleteProperty",
    "defineProperty", "ownKeys", "apply", "construct"
];

var {proxy, revoke} = Proxy.revocable({}, {});
assertEquals(0, revoke.length);

assertEquals(undefined, revoke());
for (var trap of traps) {
  assertThrows(() => Reflect[trap](proxy), TypeError);
}

assertEquals(undefined, revoke());
for (var trap of traps) {
  assertThrows(() => Reflect[trap](proxy), TypeError);
}
