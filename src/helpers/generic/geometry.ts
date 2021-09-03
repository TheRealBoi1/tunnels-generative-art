import * as turf from '@turf/turf'
import { Vertex, Polygon } from '../../interfaces'

export function generateVonoroiDiagram(
  outlineVertices: Vertex[],
  seedVerticesCount: number
): Polygon[] {
  let turfOutlinePolygon = turf.polygon([[...outlineVertices]])
  let turfOutlinePolygonBBox = turf.bbox(turfOutlinePolygon)

  let voronoiSeedVertices: any[] = []
  do {
    let missingVoronoiSeedVertices =
      seedVerticesCount - voronoiSeedVertices.length
    let turfPoints = turf.randomPoint(missingVoronoiSeedVertices, {
      bbox: turfOutlinePolygonBBox,
    })
    turfPoints.features.forEach((feature: any) => {
      if (turf.booleanPointInPolygon(feature, turfOutlinePolygon)) {
        voronoiSeedVertices.push(feature)
      }
    })
  } while (voronoiSeedVertices.length < seedVerticesCount)

  let voronoiPolygons = turf.voronoi(
    turf.featureCollection(voronoiSeedVertices),
    { bbox: turfOutlinePolygonBBox }
  )

  return voronoiPolygons.features.map((feature: any) => {
    return {
      vertices: feature.geometry.coordinates[0],
    }
  })
}

export function translateVertices(vertices: Vertex[], x: number, y: number) {
  return vertices.map((vertex) => {
    return [vertex[0] + x, vertex[1] + y]
  })
}

export function getRandomVerticesInsidePolygon(
  polygonVertices: Vertex[],
  verticesCount: number
) {
  let turfOutlinePolygon = turf.polygon([[...polygonVertices]])
  let turfOutlinePolygonBBox = turf.bbox(turfOutlinePolygon)

  let collectedVertices: Vertex[] = []
  while (collectedVertices.length < verticesCount) {
    let missingInnerVerticesCount = verticesCount - collectedVertices.length
    let turfPoints = turf.randomPoint(missingInnerVerticesCount, {
      bbox: turfOutlinePolygonBBox,
    })
    turfPoints.features.forEach((feature: any) => {
      if (turf.booleanPointInPolygon(feature, turfOutlinePolygon)) {
        collectedVertices.push(feature.geometry.coordinates)
      }
    })
  }

  return collectedVertices
}

export function getDistanceBetweenVertices(v1: Vertex, v2: Vertex): number {
  return Math.sqrt(Math.pow(v2[0] - v1[0], 2) + Math.pow(v2[1] - v1[1], 2))
}

export function getClosestVertexIndex(
  testedVertex: Vertex,
  targetVertices: Vertex[]
): number {
  let currentClosestVertexIndex = -1
  let smallestDistance = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < targetVertices.length; i++) {
    let targetVertex = targetVertices[i]
    let distance = getDistanceBetweenVertices(testedVertex, targetVertex)
    if (distance < smallestDistance) {
      currentClosestVertexIndex = i
      smallestDistance = distance
    }
  }

  return currentClosestVertexIndex
}

export function rewindVertices(vertices: Vertex[]): Vertex[] {
  let turfPolygon = turf.polygon([[...vertices, vertices[0]]])
  let rewind = turf.rewind(turfPolygon)

  return rewind.geometry.coordinates[0].map((coordinate: any) => {
    return coordinate
  })
}

export function invertVertices(
  vertices: Vertex[],
  invertX: boolean,
  invertY: boolean
) {
  return vertices.map((v) => {
    return [(invertX ? -1 : 1) * v[0], (invertY ? -1 : 1) * v[1]]
  })
}
