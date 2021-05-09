import { DMMF } from '@prisma/generator-helper'
import { buildBlockHeader, StringBuilderArtifact, BlockType, addTab } from '../common'

export function prismaEnumToPlantUMLEnum(prismaEnum: DMMF.DatamodelEnum) {
  const builder = []
  builder.push(buildBlockHeader(BlockType.Enum, prismaEnum.name))
  builder.push(
    StringBuilderArtifact.Breakline,
    ...prismaEnum.values.map(({ name }) => `${addTab(name)}${StringBuilderArtifact.Breakline}`),
    StringBuilderArtifact.CloseBrace,
  )
  return builder.join('')
}
