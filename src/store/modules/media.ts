import Vue from 'vue'
import { apolloQueryPage } from '../api'
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
import {
  MediaNode,
  Media,
  MediaEdgeExtended,
  MediaEdge,
  Data,
  RawFilter,
  Filter,
  FetchVariables,
  Page
} from '@/types'

function createVariables(
  acc: {
    idIn: number[]
  }[],
  media: MediaNode
): {
  idIn: number[]
}[] {
  const index = acc.findIndex(arr => arr.idIn.length < 50)
  if (index === -1) {
    acc.push({ idIn: [media.id] })
  } else {
    acc[index].idIn.push(media.id)
  }
  return acc
}

function applyFilter(
  filteredEdges: MediaEdgeExtended[],
  filter: RawFilter
): MediaEdgeExtended[] {
  return filteredEdges.filter(filter)
}

function filterDuplicate<E = any>(
  test: (element: E, otherElement: E, i?: number, arr?: E[]) => boolean,
  element: E,
  i: number,
  arr: E[]
): boolean {
  return arr.findIndex(test.bind(null, element)) === i
}

function nodesAreEqual(element: MediaNode, otherElement: MediaNode) {
  return element.id === otherElement.id
}

function filterDuplicateNodes(
  node: MediaNode,
  i: number,
  allNodes: MediaNode[]
): boolean {
  return filterDuplicate(nodesAreEqual, node, i, allNodes)
}

function filterDuplicateEdges(
  edge: MediaEdge,
  i: number,
  allEdges: MediaEdge[]
): boolean {
  return filterDuplicateNodes(edge.node, i, allEdges.map(({ node }) => node))
}
@Module({
  namespaced: true,
  name: 'media',
  store,
  dynamic: true
})
export class ModuleMedia extends VuexModule {
  public currentId: number | null = null

  public media: Data<Media> = {}

  public filters: Data<Filter> = {}

  // public filteredMedia: MediaEdgeExtended[] = []

  public get activeFilters() {
    return Object.values(this.filters).filter(({ active }) => active)
  }

  public get exclusiveFilters(): RawFilter[] {
    return this.activeFilters
      .filter(({ exclusive }) => exclusive)
      .map(({ filter }) => filter)
  }

  public get inclusiveFilters(): RawFilter[] {
    return this.activeFilters
      .filter(({ exclusive }) => !exclusive)
      .map(({ filter }) => filter)
  }

  public get currentMedia(): Media | null {
    const { currentId, media } = this
    return (currentId && media[currentId]) || null
  }

  public get relationTypes(): string[] {
    const { inclusiveFilters, filteredMedia } = this
    return [
      ...new Set(
        inclusiveFilters
          .reduce(applyFilter, filteredMedia)
          .flatMap(media => media.node.relations.edges)
          .map(({ relationType }) => relationType)
      )
    ]
  }

  public get sortedMedia(): Media[] {
    const getYear = (seasonInt: number) => {
      const year = Math.floor(seasonInt / 10)
      return year > 50 ? 1900 + year : 2000 + year
    }

    return this.filteredMedia
      .map(({ node }) => node)
      .sort(
        (
          { startDate: dateA, seasonInt: seasonA },
          { startDate: dateB, seasonInt: seasonB }
        ) =>
          (seasonA &&
            seasonB &&
            (getYear(seasonA) - getYear(seasonB) ||
              (seasonA % 10) - (seasonB % 10))) ||
          (dateA.year && dateB.year && dateA.year - dateB.year) ||
          (dateA.month && dateB.month && dateA.month - dateB.month) ||
          (dateA.day && dateB.day && dateA.day - dateB.day) ||
          1
      )
  }

  public get filteredMedia(): MediaEdgeExtended[] {
    const getRelatedMedia = (
      edges: MediaEdge[],
      acc: MediaEdgeExtended[] = []
    ): MediaEdgeExtended[] => {
      const { exclusiveFilters, inclusiveFilters, media } = this

      const newMedia = exclusiveFilters.reduce(
        applyFilter,
        edges
          .map(({ relationType, node }) => {
            return {
              relationType,
              node: media[node.id]
            }
          })
          .filter(({ node }) => node)
      )

      acc.push(...newMedia)
      const accNodes = acc.map(({ node }) => node)
      const relatedNodes = inclusiveFilters
        .reduce(applyFilter, newMedia)
        .map(({ node }) => node)
        .flatMap(({ relations }) => relations.edges)
        .filter(filterDuplicateEdges)
        .filter(({ node }) => !accNodes.some(nodesAreEqual.bind(null, node)))

      if (relatedNodes.length) {
        return getRelatedMedia(relatedNodes, acc)
      }

      return acc
    }

    const { currentId } = this

    return currentId
      ? getRelatedMedia([
          {
            node: {
              id: currentId,
              type: ''
            },
            relationType: '',
            id: -1
          }
        ])
      : []
  }

  @Mutation
  public CHANGE_FILTER(filter: Filter): Filter {
    return Vue.set(this.filters, filter.id, filter)
  }

  @Mutation
  public ADD_MEDIA(media: Media): Media {
    return Vue.set(this.media, media.id, media)
  }

  @MutationAction
  public async CHANGE_CURRENT_ID({
    currentId
  }: {
    currentId: number | null
  }): Promise<{
    currentId: number | null
  }> {
    return { currentId }
  }

  @Action
  public async extendMediaEdge({
    relationType,
    node
  }: MediaEdge): Promise<MediaEdgeExtended> {
    return Promise.resolve({
      relationType,
      node: await this.getMedia(node.id)
    })
  }

  @Action
  public async fetchMedia(variables: FetchVariables): Promise<Media[]> {
    return this.fetchMediaPage(variables).then(page => page.media)
  }

  @Action
  public async fetchMediaPage(variables: FetchVariables): Promise<Page> {
    return new Promise(resolve =>
      apolloQueryPage(variables)
        .then(page => {
          const newMedia = page.media
          newMedia.forEach(this.ADD_MEDIA)
          return page
        })
        .then(resolve)
        .catch(() =>
          setTimeout(() => this.fetchMediaPage(variables).then(resolve), 10000)
        )
    )
  }

  @Action
  public async handleQueue(medias: Media[]): Promise<void> {
    return new Promise(resolve => {
      const { media } = this
      const newMedias: MediaNode[] = medias
        .flatMap(newMedia => newMedia.relations.edges)
        .map(({ node }) => node)
        .filter(filterDuplicateNodes)
        .filter(newMedia => !media[newMedia.id])

      if (newMedias.length) {
        const { fetchMedia, handleQueue } = this
        Promise.all(newMedias.reduce(createVariables, []).map(fetchMedia))
          .then(result => result.flat())
          .then(handleQueue)
          .then(resolve)
      } else {
        resolve()
      }
    })
  }

  // @Action
  // public async getFilteredMedia({
  //   edges = [
  //     {
  //       node: {
  //         id: this.currentId || -1,
  //         type: ''
  //       },
  //       relationType: '',
  //       id: -1
  //     }
  //   ],
  //   acc = []
  // }: {
  //   edges?: MediaEdge[]
  //   acc?: MediaEdgeExtended[]
  // }): Promise<MediaEdgeExtended[]> {
  //   return new Promise(async resolve => {
  //     const {
  //       exclusiveFilters,
  //       inclusiveFilters
  //       // ,media
  //     } = this

  //     const newMedia = exclusiveFilters.reduce(
  //       applyFilter,
  //       await Promise.all(edges.map(this.extendMediaEdge))
  //       // edges
  //       //   .map(({ relationType, node }) => {
  //       //     return {
  //       //       relationType,
  //       //       node: media[node.id]
  //       //     }
  //       //   })
  //       //   .filter(({ node }) => node)
  //     )

  //     acc.push(...newMedia)
  //     const accNodes = acc.map(({ node }) => node)
  //     const relatedNodes = inclusiveFilters
  //       .reduce(applyFilter, newMedia)
  //       .map(({ node }) => node)
  //       .flatMap(({ relations }) => relations.edges)
  //       .filter(filterDuplicateEdges)
  //       .filter(({ node }) => !accNodes.some(nodesAreEqual.bind(null, node)))

  //     if (relatedNodes.length) {
  //       this.getFilteredMedia({ edges: relatedNodes, acc }).then(resolve)
  //     } else {
  //       resolve(acc)
  //     }
  //   })
  // }

  // @Mutation
  // public CHANGE_FILTERED_MEDIA(filteredMedia: MediaEdgeExtended[]) {
  //   this.filteredMedia = filteredMedia
  // }

  // @Action({ commit: 'CHANGE_FILTERED_MEDIA' })
  // public async changeFilteredMedia() {
  //   return await this.getFilteredMedia({})
  // }

  @Action
  public async getMedia(id: number) {
    return new Promise<Media>(async (resolve, reject) => {
      const storedMedia = this.media[id]
      if (storedMedia) {
        resolve(storedMedia)
      } else {
        const media = await this.fetchMedia({
          idIn: [id]
        })

        if (media.length) {
          resolve(media.shift())
        } else {
          reject()
        }
      }
    })
  }
}
export const media =getModule(ModuleMedia)
export default media
