import os from 'node:os';

export const osInfo = async (args) => {
  if (args.length !== 1) {
    throw new Error('Invalid Input');
  }

  switch (args[0]) {
    case '--cpus':
      console.log(os.cpus().length);
      break;
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;
    case '--homedir':
      console.log(os.homedir());
      return os.homedir();
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(os.arch());
      break;
    default:
      throw new Error('Invalid Input');
  }
};
