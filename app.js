import { up, cd, ls } from './commands/nwd.js';
import { cat, add, rn, copy, rm } from './commands/files.js';
import { osInfo } from './commands/os.js';
import hash from './commands/hash.js';
import { compress, decompress } from './commands/zip.js';

export const execute = async (command, args, currentDir) => { 
  switch (command) {
    case 'up':
      return await up(currentDir);
    case 'cd':
      return await cd(currentDir, args);
    case 'ls':
      return await ls(currentDir);
    case 'cat':
      return await cat(currentDir, args);
    case 'add':
      return await add(currentDir, args);
    case 'rn':
      return await rn(currentDir, args);
    case 'cp':
      return await copy(currentDir, args);
    case 'rm':
      return await rm(currentDir, args);
    case 'os':
      return await osInfo(args);
    case 'hash':
      return await hash(currentDir, args);
    case 'compress':
      return await compress(currentDir, args);
    case 'decompress':
      return await decompress(currentDir, args);
    default:
      console.log('Invalid input');
  }
};
