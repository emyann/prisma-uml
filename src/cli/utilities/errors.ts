import { fmtError } from './log';

export class GenericError extends Error {
  constructor(message: string) {
    super(fmtError`${message}`);
    this.name = 'GenericError';
  }
}

export class ArgsConflictError extends Error {
  constructor(...args: string[]) {
    super(fmtError`Arguments ${args.join(', ')} can't be use jointly. You might choose between one of them.`);
    this.name = 'ArgsConflictError';
  }
}

export class RequiredArgsError extends Error {
  constructor(...args: string[]) {
    const argsList = args.reduce((acc, cur) => {
      acc += `\n    - ${cur}`;
      return acc;
    }, '');
    const message = `
One argument below is required: ${argsList}
`;
    super(fmtError`${message}`);
    this.name = 'RequiredArgsError';
  }
}

export class NotAFileError extends Error {
  constructor(path: string, arg: string) {
    super(fmtError`Path ${path} provided to '${arg}' is not a file.`);
    this.name = 'NotAFileError';
  }
}

export class FileNotExistsError extends Error {
  constructor(path: string, arg: string) {
    super(fmtError`File ${path} provided to '${arg}' does not exists.`);
    this.name = 'FileNotExistsError';
  }
}
