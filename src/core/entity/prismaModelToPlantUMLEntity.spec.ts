import { DMMF } from "@prisma/generator-helper";
import { prismaModelToPlantUMLEntity } from "./prismaModelToPlantUMLEntity";

describe("Entity", () => {
  it("should transform a prisma model to plantUML entity", () => {
    const model: DMMF.Model = {
      dbName: "",
      idFields: [],
      isEmbedded: false,
      name: "MyModel",
      fields: [],
      uniqueFields: [],
      uniqueIndexes: [],
    };

    const result = prismaModelToPlantUMLEntity(model);
    expect(result).toMatchInlineSnapshot(`
      "entity MyModel {
      }"
    `);
  });

  it("should add a question mark on optional field", () => {
    const model: DMMF.Model = {
      dbName: "",
      idFields: [],
      isEmbedded: false,
      uniqueFields: [],
      uniqueIndexes: [],
      name: "MyModel",
      fields: [
        {
          name: "Field1",
          type: "String",
          kind: "scalar",
          hasDefaultValue: false,
          isList: false,
          isRequired: false,
          isUnique: false,
          isId: true,
          isGenerated: false,
          dbNames: [],
        },
      ],
    };
    const result = prismaModelToPlantUMLEntity(model);

    expect(result).toMatchInlineSnapshot(`
      "entity MyModel {
        Field1: String?
      }"
    `);
  });

  it("should suffix a field by an asterisk(*) when required", () => {
    const model: DMMF.Model = {
      dbName: "",
      idFields: [],
      isEmbedded: false,
      name: "MyModel",
      uniqueFields: [],
      uniqueIndexes: [],
      fields: [
        {
          name: "Field1",
          type: "String",
          kind: "scalar",
          hasDefaultValue: false,
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: true,
          isGenerated: false,
          dbNames: [],
        },
      ],
    };

    const result = prismaModelToPlantUMLEntity(model);

    expect(result).toMatchInlineSnapshot(`
      "entity MyModel {
        * Field1: String
      }"
    `);
  });

  it("should suffix a field by brackets when isList", () => {
    const model: DMMF.Model = {
      dbName: "",
      idFields: [],
      isEmbedded: false,
      name: "MyModel",
      uniqueFields: [],
      uniqueIndexes: [],
      fields: [
        {
          name: "Field1",
          type: "String",
          kind: "scalar",
          hasDefaultValue: false,
          isList: true,
          isRequired: true,
          isUnique: false,
          isId: true,
          isGenerated: false,
          dbNames: [],
        },
      ],
    };

    const result = prismaModelToPlantUMLEntity(model);

    expect(result).toMatchInlineSnapshot(`
      "entity MyModel {
        * Field1: String[]
      }"
    `);
  });
});
