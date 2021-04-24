import { DMMF } from '@prisma/generator-helper'
import { prismaEnumToPlantUMLEnum } from './prismaEnumToPlantUMLEnum'

describe('Enums', () => {
  it('should transform a prisma enum to a plantUML enum', () => {
    const prismaEnum: DMMF.DatamodelEnum = {
      name: 'MyEnum',
      values: [
        { name: 'Value1', dbName: '' },
        { name: 'Value2', dbName: '' },
      ],
    }

    const result = prismaEnumToPlantUMLEnum(prismaEnum)
    expect(result).toMatchInlineSnapshot(`
      "enum MyEnum {
        Value1
        Value2
      }"
    `)
  })
})
