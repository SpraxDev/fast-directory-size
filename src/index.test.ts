import { randomBytes } from 'crypto';
import { test } from 'tap';
import { getDirectorySize } from '.';

test('folder size is larger than 0', t => {
  getDirectorySize('.')
      .then((size) => {
        t.ok(Number.isFinite(size));
        t.ok(size > 0);
      })
      .catch(t.error)
      .finally(t.end);
});

test('folder size is correct', t => {
  const testSize = 8 * 1024;
  const testDir = t.testdir({rndBytes: randomBytes(testSize)});

  getDirectorySize(testDir)
      .then((size) => {
        console.log('Expected:', testSize, '|', 'Got:', size);

        t.ok(size >= testSize);
        t.ok(size <= testSize * 1.5);
      })
      .catch(t.error)
      .finally(t.end);
});
