export enum StringBuilderArtifact {
  WhiteSpace = ' ',
  OpenBrace = '{',
  CloseBrace = '}',
  OpenBracket = '[',
  closeBracket = ']',
  Tab = '\t',
  Breakline = '\n',
  Colons = ':',
  QuestionMark = '?',
  Asterisk = '*',
  DoubleDots = '..',
}

export enum BlockType {
  Entity = 'entity',
  Enum = 'enum',
}

export function buildBlockHeader(type: BlockType, name: string) {
  return [
    type,
    StringBuilderArtifact.WhiteSpace,
    name,
    StringBuilderArtifact.WhiteSpace,
    StringBuilderArtifact.OpenBrace,
  ].join('')
}

export function addTab(text: string) {
  return text.padStart(text.length + 2, StringBuilderArtifact.WhiteSpace)
}

export function addNewLine(text: string, countOfLines: number = 1) {
  const builder = [text]
  for (let i = 0; i < countOfLines; i++) {
    builder.push(StringBuilderArtifact.Breakline)
  }
  return builder.join('')
}
