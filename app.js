import { osInfo } from './commands/os.js';

export const execute = async (command, args, currentDir) => { 
  switch (command) {
    case 'os':
      return await osInfo(args);
  }
};
