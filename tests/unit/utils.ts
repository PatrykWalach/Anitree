import {
  ThisTypedShallowMountOptions,
  createLocalVue,
  shallowMount,
} from '@vue/test-utils'
import Vue from 'vue'
import VueCompostionApi from '@vue/composition-api'
import Vuetify from 'vuetify'

export const matchSnapshot = (
  Component: any,
  options: ThisTypedShallowMountOptions<Vue> = {},
  name: string = 'matches snapshot',
) =>
  test(name, () => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    localVue.use(VueCompostionApi)

    const wrapper = shallowMount(Component, {
      localVue,
      vuetify: new Vuetify(),
      ...options,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

type Chunk<T> = Record<string, T>
type Factory<A extends any[]> = () => A

type MakeVariations<T> = {
  [K in keyof T]: T[K] extends Factory<infer R>
    ? R extends (infer U)[]
      ? U
      : any
    : MakeVariations<T[K]>
}

const keyAndArrayToChunks = <A>(key: string, permutations: A[]): Chunk<A>[] =>
  permutations.map(value => ({
    [key]: value,
  }))

const reduceChunksMap = <O extends Chunk<any>>(chunksMap: O[][], i: number) => {
  let product = 1

  return chunksMap.reduce((acc, chunks) => {
    const chunksLength = chunks.length
    const chunk = chunks[Math.floor(i / product) % chunksLength]
    product *= chunksLength

    return {
      ...acc,
      ...chunk,
    }
  }, {})
}
const createArrayOfLength = (length: number) =>
  Array.from({ length }, (v, k) => k)

export const createVariations = <O extends Chunk<any>>(
  obj: O,
): MakeVariations<O>[] => {
  const chunksMap: {
    [x: string]: any
  }[][] = []

  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof Function) {
      return chunksMap.push(keyAndArrayToChunks(key, value()))
    }
    if (value instanceof Object) {
      return chunksMap.push(keyAndArrayToChunks(key, createVariations(value)))
    }
  })

  const permutations = chunksMap.reduce((acc, chunk) => acc * chunk.length, 1)

  return createArrayOfLength(permutations).map(i => ({
    ...obj,
    ...reduceChunksMap(chunksMap, i),
  }))
}

// console.log(
//   createVariations({
//     a: false,
//     x: () => [1, 2],
//     y: () => [
//       ...createVariations({
//         b: 'string',
//         z1: () => [3, 4, 5],
//       }),
//       ...createVariations({
//         b: '',
//         z2: () => [6, 7],
//       }),
//     ],
//   }),
// )
