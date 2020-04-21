import { getDMMF } from '@prisma/sdk';
import { prismaToPlantUML } from 'core/prismaToPlantUML';

async function main() {
  const dmmf = await getDMMF({ datamodelPath: './examples/simple/schema.prisma' });
  const result = prismaToPlantUML(dmmf);
  console.log(result);
}

main();
