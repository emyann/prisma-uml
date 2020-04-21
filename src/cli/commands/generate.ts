import { Argv } from 'yargs';
import { loadPrismaSchema, prismaToPlantUML } from 'core';
import chalk from 'chalk';

enum OutputType {
  Text = 'text',
}
enum CommandPositionals {
  Path = 'path',
}
enum CommandOptions {
  Output = 'output',
}
const command = ['$0 <path>'];
const describe = 'Generate a plantUML from a Prisma schema';
const builder = (yargs: Argv) => {
  return yargs
    .positional(CommandPositionals.Path, {
      describe: 'Path to Prisma schema',
      type: 'string',
    })
    .usage(
      `
Usage
  ${chalk.green('$0')} <path> [options]`
    )
    .example(`${chalk.green('$0')} ./schema.prisma`, `Output a plantUML Entity Relation Diagram as text`)
    .options({
      [CommandOptions.Output]: {
        alias: 'o',
        describe: 'Output of the diagram',
        type: 'string',
        default: 'text',
        choices: ['text'],
      },
    })
    .version(false);
};

const handler = async (args: Arguments) => {
  const prismaSchemaPath = args[CommandPositionals.Path]!;
  const output = args[CommandOptions.Output]! as OutputType;

  const dmmf = await loadPrismaSchema(prismaSchemaPath);
  const plantUML = prismaToPlantUML(dmmf);
  switch (output) {
    case OutputType.Text:
      process.stdout.write(plantUML);
      break;

    default:
      break;
  }
};

type CommandBuilder = typeof builder;
type Arguments = ReturnType<CommandBuilder>['argv'];

export const generate = {
  command,
  describe,
  builder,
  handler,
};
