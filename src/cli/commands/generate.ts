import { Argv } from 'yargs';
import { loadPrismaSchema, prismaToPlantUML } from 'core';
import chalk from 'chalk';
import { plantUMLEncode } from './plantUMLEncode';
import axios, { AxiosError } from 'axios';
import { createWriteStream } from 'fs';
import { Stream } from 'stream';
import { fmtSuccess, fmtError } from 'cli/utilities/log';
import { RequiredArgsError } from 'cli/utilities/errors';

enum OutputType {
  Text = 'text',
  SVG = 'svg',
  PNG = 'png',
  JPG = 'jpg',
}
enum CommandArgument {
  Path = 'path',
}
enum CommandOptions {
  Output = 'output',
  Server = 'server',
  File = 'file',
}
const command = ['$0 <path>'];
const describe = 'Generate a plantUML from a Prisma schema';
const builder = (yargs: Argv) => {
  return yargs
    .positional(CommandArgument.Path, {
      describe: 'Path to Prisma schema',
      type: 'string',
    })
    .usage(
      `
Usage
  ${chalk.green('$0')} <path> [options]`
    )
    .example(`${chalk.green('$0')} ./schema.prisma`, `Output a plantUML Entity Relation Diagram as text in the stdout`)
    .example(`${chalk.green('$0')} ./schema.prisma > my-erd.plantuml`, `Save the diagram into a .plantuml file`)
    .example(`${chalk.green('$0')} ./schema.prisma --output svg --file my-erd.svg`, `Output a diagram as SVG`)
    .example(`${chalk.green('$0')} ./schema.prisma -o png -f my-erd.png`, `Output a diagram as PNG`)
    .example(`${chalk.green('$0')} ./schema.prisma --server http://localhost:8080`, `Use a plantUML custom server to render the image`)
    .options({
      [CommandOptions.Output]: {
        alias: 'o',
        describe: 'Output of the diagram',
        type: 'string',
        default: OutputType.Text,
        choices: [OutputType.Text, OutputType.SVG, OutputType.PNG, OutputType.JPG],
      },
      [CommandOptions.Server]: {
        alias: 's',
        describe: 'PlantUML Server URL',
        type: 'string',
        default: 'https://www.plantuml.com/plantuml',
      },
      [CommandOptions.File]: {
        alias: 'f',
        describe: 'Filename or File full path to output',
        type: 'string',
      },
    })
    .check(checkRequiredArgs)
    .version(false);
};

const handler = async (args: Arguments) => {
  const prismaSchemaPath = args[CommandArgument.Path]!;
  const output = args[CommandOptions.Output]! as OutputType;
  const server = args[CommandOptions.Server]!;
  const file = args[CommandOptions.File]!;

  const dmmf = await loadPrismaSchema(prismaSchemaPath);
  const plantUML = prismaToPlantUML(dmmf);
  switch (output) {
    case OutputType.Text: {
      process.stdout.write(plantUML);
      break;
    }
    case OutputType.SVG: {
      try {
        const response = await getFileStream(plantUML, server, FileKind.SVG);
        await saveFile(response.data, file);
        process.stdout.write(`✅ File ${file} successfully created!`);
      } catch (error) {
        if (isAxiosError(error)) {
          process.stderr.write(error.message);
        } else {
          process.stderr.write('❌ An error has occurred while creating the file');
          throw error;
        }
      }
      break;
    }
    case OutputType.PNG: {
      try {
        const response = await getFileStream(plantUML, server, FileKind.PNG);
        await saveFile(response.data, file);
        process.stdout.write(fmtSuccess`✅ File ${file} successfully created!`);
      } catch (error) {
        if (isAxiosError(error)) {
          process.stderr.write(error.message);
        } else {
          process.stderr.write(fmtError`❌ An error has occurred while creating the file`);
          throw error;
        }
      }
      break;
    }
    case OutputType.JPG: {
      try {
        const response = await getFileStream(plantUML, server, FileKind.PNG);
        await saveFile(response.data, file);
        process.stdout.write(fmtSuccess`✅ File ${file} successfully created!`);
      } catch (error) {
        if (isAxiosError(error)) {
          process.stderr.write(error.message);
        } else {
          process.stderr.write(fmtError`❌ An error has occurred while creating the file`);
          throw error;
        }
      }
      break;
    }

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

enum FileKind {
  SVG = 'svg',
  PNG = 'png',
  JPG = 'jpg',
}

function getFileStream(plantUML: string, serverUrl: string, fileKind: FileKind) {
  const code = plantUMLEncode(plantUML);
  if (fileKind === FileKind.JPG) {
    return axios.request<Stream>({ baseURL: serverUrl, url: `/img/${code}`, method: 'GET', responseType: 'stream' });
  } else {
    return axios.request<Stream>({ baseURL: serverUrl, url: `/${fileKind}/${code}`, method: 'GET', responseType: 'stream' });
  }
}

function saveFile(fileStream: Stream, path: string) {
  return new Promise((resolve, reject) => {
    const writer = createWriteStream(path, { encoding: 'utf8' });
    writer.on('finish', resolve);
    writer.on('error', (error) => reject(error));
    fileStream.pipe(writer);
  });
}

function isAxiosError(error: any): error is AxiosError {
  return !!error.isAxiosError;
}

export function checkRequiredArgs(args: any) {
  const output = args[CommandOptions.Output]! as OutputType;
  const file = args[CommandOptions.File] as string;
  if (output !== OutputType.Text && !file) {
    throw new RequiredArgsError(CommandOptions.File);
  }

  return true;
}
