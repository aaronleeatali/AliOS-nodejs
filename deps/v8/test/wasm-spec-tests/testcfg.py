# Copyright 2017 the V8 project authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

import os

from testrunner.local import testsuite
from testrunner.objects import testcase

class WasmSpecTestsTestSuite(testsuite.TestSuite):
  def __init__(self, name, root, target_root=None, device=None):
    super(WasmSpecTestsTestSuite, self).__init__(name, root, target_root, device)

  def ListTests(self, context):
    tests = []
    for dirname, dirs, files in os.walk(self.root):
      for dotted in [x for x in dirs if x.startswith('.')]:
        dirs.remove(dotted)
      for filename in files:
        if (filename.endswith(".js")):
          fullpath = os.path.join(dirname, filename)
          relpath = fullpath[len(self.root) + 1 : -3]
          testname = relpath.replace(os.path.sep, "/")
          test = testcase.TestCase(self, testname)
          tests.append(test)
    return tests

  def GetFlagsForTestCase(self, testcase, context):
    flags = [] + context.mode_flags
    self_root = self.root
    if self.target_root:
      self_root = os.path.join(self.target_root, "test", "wasm-spec-tests")
    flags.append(os.path.join(self_root, testcase.path + self.suffix()))
    return testcase.flags + flags


def GetSuite(name, root, target_root=None, device=None):
  return WasmSpecTestsTestSuite(name, root, target_root, device)
