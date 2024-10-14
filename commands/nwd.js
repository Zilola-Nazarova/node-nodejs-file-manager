import { resolve } from 'node:path';
import { readdir } from 'node:fs/promises';

export const up = async (currentDir) => {
  console.log("UP");
  try {
    const newPath = resolve(currentDir.path, '..');
    await readdir(newPath);
    currentDir.path = newPath;
    return;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Operation failed');
    } else {
      throw error;
    }
  } 
};

export const cd = async (currentDir, args) => {
  if (args.length !== 1) {
    throw new Error('Invalid Input');
  }

  try {
    const newPath = resolve(currentDir.path, args[0]);
    await readdir(newPath);
    currentDir.path = newPath;
    return;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Operation failed');
    } else {
      throw error;
    }
  } 
};

export const ls = async (currentDir) => {
  try {
    const arr = await readdir(currentDir.path, {withFileTypes: true});
    const table = arr.map((file) => {
      const name = file.name.length > 25 ? (file.name.substring(0, 24) + '...') : file.name;
      const type = file.isDirectory() ? 'dir' : 'file';
      return { 'Name': name, 'Type': type };
    });
    console.table(table);
    return;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Operation failed');
    } else {
      throw error;
    }
  }
};
