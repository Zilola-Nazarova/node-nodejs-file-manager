import readline from 'node:readline';
import { execute } from './app.js';

const processPromt = async (operation, currentDir) => {
  const args = operation.split(' ').slice(1);
  const command = operation.split(' ')[0];
  try {
    return await execute(command, args, currentDir);
  } catch (error) {
    console.log(error.message); 
  }
};

const main = async () => {
  const homedir = await processPromt('os --homedir');
  const currentDir = { path: homedir };
  const args = process.argv.slice(2);
  const username = args[0].split('=')[1];
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${currentDir.path}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    return rl.close();
  });

  const recursiveAsyncReadLine = (currentDir) => {
    rl.question(`Enter operation:\n`, async (operation) => {  
      if (operation === '.exit') {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        return rl.close();
      }
      await processPromt(operation, currentDir);
      console.log(`You are currently in ${currentDir.path}`);
      recursiveAsyncReadLine(currentDir);
    });
  }

  recursiveAsyncReadLine(currentDir);
};

main();
