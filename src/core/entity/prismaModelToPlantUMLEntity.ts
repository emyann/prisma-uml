import { DMMF } from '@prisma/generator-helper'
import { StringBuilderArtifact, buildBlockHeader, BlockType, addTab, addNewLine } from '../common'

export function prismaModelToPlantUMLEntity(model: DMMF.Model) {
  const formatField = (field: DMMF.Field) => {
    const builder = []
    builder.push(
      field.isRequired ? `${StringBuilderArtifact.Asterisk + StringBuilderArtifact.WhiteSpace}` : null,
      field.name,
      StringBuilderArtifact.Colons,
      StringBuilderArtifact.WhiteSpace,
      field.type,
      field.isList ? `${StringBuilderArtifact.OpenBracket + StringBuilderArtifact.closeBracket}` : null,
      field.isRequired ? null : StringBuilderArtifact.QuestionMark,
    )
    return builder.join('')
  }

  const builder = []
  builder.push(buildBlockHeader(BlockType.Entity, model.name))
  builder.push(
    StringBuilderArtifact.Breakline,
    ...model.fields
      .map((field) => formatField(field))
      .map(addTab)
      .map((text) => addNewLine(text)),
    StringBuilderArtifact.CloseBrace,
  )
  return builder.join('')
}
