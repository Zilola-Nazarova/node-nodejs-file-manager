import path from 'node:path';
import { pipeline, Transform } from 'node:stream';
import fs from 'node:fs';
import { createHash } from 'node:crypto';

const calculateHash = async (readPath) => {
  const readStream = fs.createReadStream(readPath);
  const hash = createHash('sha256');
  hash.setEncoding('hex');
  readStream.on('end', () => {
    hash.end();
    console.log(hash.read());
  });
  readStream.pipe(hash);
}

const hash = async (currentDir, args) => {
  if (args.length !== 1) {
    throw new Error('Invalid Input');
  }
  const readPath = path.resolve(currentDir.path, args[0]);
  await calculateHash(readPath);
};

export default hash;
