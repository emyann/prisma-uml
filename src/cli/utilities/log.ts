import chalk from 'chalk';

enum Color {
  Blue = '#4285f4',
  Green = '#34a853',
  Yellow = '#fbbc05',
  Red = '#ea4335'
}

export function fmtError(message: TemplateStringsArray, ...values: any) {
  const finalMessage = templateStringReducer(message, values);
  return chalk.hex(Color.Red).bold(finalMessage);
}

export function fmtSuccess(message: TemplateStringsArray, ...values: any) {
  const finalMessage = templateStringReducer(message, values);
  return chalk.hex(Color.Green).bold(finalMessage);
}

export function fmtLog(message: TemplateStringsArray, ...values: any) {
  const finalMessage = templateStringReducer(message, values);
  return chalk.hex(Color.Blue).bold(finalMessage);
}

export function fmtWarn(message: TemplateStringsArray, ...values: any) {
  const finalMessage = templateStringReducer(message, values);
  return chalk.hex(Color.Yellow).bold(finalMessage);
}

function templateStringReducer(message: TemplateStringsArray, ...values: any) {
  return message.reduce((acc, cur, idx) => {
    acc += cur;
    acc += values[idx] !== undefined ? values[idx] : '';
    return acc;
  }, '');
}
