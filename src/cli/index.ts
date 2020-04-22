import yargs from 'yargs';
import { generate } from './commands/generate';

yargs.help().wrap(yargs.terminalWidth()).showHelpOnFail(true).command(generate).demandCommand().recommendCommands().strict().version(true)
  .argv;
