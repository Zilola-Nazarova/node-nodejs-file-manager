import { resolve, join, dirname, basename } from 'node:path';
import { readFile, writeFile, unlink, rename, cp } from 'node:fs/promises';

export const cat = async (currentDir, args) => {
  if (args.length !== 1) {
    throw new Error('Invalid Input');
  }

  const pathToRead = resolve(currentDir.path, args[0]);
  try {
    const contents = await readFile(pathToRead, { encoding: 'utf8' });
    console.log(contents);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Operation failed');
    } else {
      throw error;
    }
  }
};

export const add = async (currentDir, args) => {
  if (args.length !== 1) {
    throw new Error('Invalid Input');
  }

  const filePath = join(currentDir.path, args[0]);
  try {
    await writeFile(
      filePath,
      '',
      { encoding: 'utf8', flag: 'wx' }
    );
  } catch (error) {
    if (error.code == 'ENOENT') {
      throw new Error('Operation failed');
    } else {
      throw error;
    }
  }
};

export const rn = async (currentDir, args) => {
  if (args.length !== 2) {
    throw new Error('Invalid Input');
  }

  const oldFilePath = resolve(currentDir.path, args[0]);
  const newFilePath = join(dirname(oldFilePath), args[1]);

  try {
    await rename(oldFilePath, newFilePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Operation failed');
    } 
    throw error;
  }
};

export const copy = async (currentDir, args) => {
  if (args.length !== 2) {
    throw new Error('Invalid Input');
  }

  const oldFilePath = resolve(currentDir.path, args[0]);
  const newFilePath = resolve(currentDir.path, args[1], basename(oldFilePath));

  try {
    await cp(oldFilePath, newFilePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw error;
    }
  }
};

export const mv = async (currentDir, args) => {
  if (args.length !== 2) {
    throw new Error('Invalid Input');
  }

  const oldFilePath = resolve(currentDir.path, args[0]);
  const newFilePath = resolve(currentDir.path, args[1], basename(oldFilePath));

  try {
    await cp(oldFilePath, newFilePath);
    await unlink(oldFilePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw error;
    }
  }
};

export const rm = async (currentDir, args) => {
  if (args.length !== 1) {
    throw new Error('Invalid Input');
  }

  const filePathToDelete = resolve(currentDir.path, args[0]);
  try {
    await unlink(filePathToDelete);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Operation failed');
    } else {
      throw error;
    }
  }
};
