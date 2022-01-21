import fs from 'fs';
import path from 'path';

test.skip('should demonstrate this matcher`s usage', () => {
  const imageAtTestPath = path.resolve(__dirname, 'reference.png');
  const imageAtTest = fs.readFileSync(imageAtTestPath);
  expect(imageAtTest).toMatchImageSnapshot();
  // 🔥 Expected image to be the same size as the snapshot (320x486), but was different (320x535).
});

test.skip('should demonstrate a failing test with non-deterministic visual elements', () => {
  const imageAtTestPath = path.resolve(__dirname, 'add-device-token-800x600-reference.png');
  const imageAtTest = fs.readFileSync(imageAtTestPath);
  expect(imageAtTest).toMatchImageSnapshot();
  // 🔥 Expected image to match or be a close match to snapshot but was 0.0225% different from snapshot (108 differing pixels).
});
