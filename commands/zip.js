import { resolve, parse } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { createGzip, createGunzip } from 'node:zlib';

export const compress = async (currentDir, args) => {
  if (args.length !== 1) {
    throw new Error('Invalid Input');
  }

  const inputPath = resolve(currentDir.path, args[0]);
  const outputPath = resolve(currentDir.path, `${args[0]}.gz`);
  const readStream = createReadStream(inputPath);
  const writeStream = createWriteStream(outputPath);

  pipeline(readStream, createGzip(), writeStream, (err) => {
    if (err) {
      throw new Error(err);
    };
  });
};

export const decompress = async (currentDir, args) => {
  if (args.length !== 1) {
    throw new Error('Invalid Input');
  }

  const inputPath = resolve(currentDir.path, args[0]);
  const outputPath = resolve(currentDir.path, `${parse(inputPath).name}`);
  const readStream = createReadStream(inputPath);
  const writeStream = createWriteStream(outputPath);

  pipeline(readStream, createGunzip(), writeStream, (err) => {
    if (err) {
      throw new Error(err);
    };
  });
};

