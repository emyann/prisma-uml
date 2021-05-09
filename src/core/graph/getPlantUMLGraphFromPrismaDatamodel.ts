import { DMMF } from '@prisma/generator-helper'
import { Graph, GraphEdge, GraphVertex, VertexKeyExtractor, EdgeKeyExtractor } from 'typescript-generic-datastructures'
import { v5 as uuidv5, v1 as uuidv1 } from 'uuid'

export interface Cardinality {
  start: string
  end: string
}
interface Relation {
  id: string
  cardinality: Cardinality
}

type GraphEntity = DMMF.Model | DMMF.DatamodelEnum
const keyExtractor: VertexKeyExtractor<GraphEntity> = (entity) => entity.name
const edgeKeyExtractor: EdgeKeyExtractor<GraphEdge<GraphEntity, Relation>> = (edge) => edge.value.id

export function getPlantUMLGraphFromPrismaDatamodel(datamodel: DMMF.Datamodel) {
  const RELATIONS_ID_NAMESPACE = uuidv1()
  const graph = new Graph<GraphEntity, Relation>(false)

  const modelVertices = datamodel.models.map((model) => new GraphVertex<GraphEntity, Relation>(model, keyExtractor))
  const enumVertices = datamodel.enums.map((pEnum) => new GraphVertex<GraphEntity, Relation>(pEnum, keyExtractor))

  modelVertices.forEach((modelVertex) => {
    graph.addVertex(modelVertex)
  })

  enumVertices.forEach((enumVertex) => {
    graph.addVertex(enumVertex)
  })

  const modelsWithRelations = datamodel.models.filter((model) => model.fields.some((field) => field.kind !== 'scalar'))

  const edges = modelsWithRelations.reduce<GraphEdge<GraphEntity, Relation>[]>((acc, model) => {
    const sourceVertex = graph.getVertexByKey(model.name)

    const edges = model.fields
      .filter((field) => field.kind !== 'scalar')
      .map((field) => {
        const stack = []
        if (field.isList) {
          stack.push('{')
        } else {
          stack.push('|')
        }
        if (field.isRequired) {
          stack.push('|')
        } else {
          stack.push('o')
        }
        const targetVertex = graph.getVertexByKey(field.type)
        if (isEnum(targetVertex.value)) {
          stack.push('|', '|')
        } else if (isModel(targetVertex.value)) {
          const oppositeField = targetVertex.value.fields.find((field) => field.type === model.name)
          if (oppositeField?.isRequired) {
            stack.push('|')
          } else {
            stack.push('o')
          }
          if (oppositeField?.isList) {
            stack.push('}')
          } else {
            stack.push('|')
          }
        }
        const cardinality: Relation['cardinality'] = { start: '', end: '' }
        while (stack.length > 0) {
          if (stack.length > 2) {
            cardinality.start += stack.pop()
          } else {
            cardinality.end += stack.pop()
          }
        }
        return { field, cardinality }
      })
      .map(({ field, cardinality }) => {
        let idFormat = `${sourceVertex.value.name}.${field.name}.${field.relationName}`
        const edgeId = uuidv5(idFormat, RELATIONS_ID_NAMESPACE)
        const targetVertex = graph.getVertexByKey(field.type)

        return new GraphEdge<GraphEntity, Relation>(
          sourceVertex,
          targetVertex,
          { id: edgeId, cardinality },
          edgeKeyExtractor,
        )
      })

    acc.push(...edges)
    return acc
  }, [])

  edges.forEach((edge) => {
    graph.addEdge(edge)
  })

  return graph
}

export function isEnum(object: any): object is DMMF.DatamodelEnum {
  return Array.isArray(object.values)
}

export function isModel(object: any): object is DMMF.Model {
  return Array.isArray(object.fields)
}
