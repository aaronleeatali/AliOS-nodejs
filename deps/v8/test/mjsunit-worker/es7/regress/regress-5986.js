// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax
if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/es7/regress/regress-5986.js");
	}
}
var array = [1.7, 1.7, 1.7];
var mutator = {
  [Symbol.toPrimitive]() {
    Object.defineProperties(array, {
      0: { get() { } },
      1: { get() { } },
      2: { get() { } },
    });
    return 0;
  }
};

assertTrue(array.includes(undefined, mutator));

function search(array, searchElement, startIndex) {
  return array.includes(searchElement, startIndex);
}

array = [1.7, 1.7, 1.7];
var not_mutator = { [Symbol.toPrimitive]() { return 0; } };
assertFalse(search(array, undefined, not_mutator));
assertFalse(search(array, undefined, not_mutator));
%OptimizeFunctionOnNextCall(search);
assertTrue(search(array, undefined, mutator));
