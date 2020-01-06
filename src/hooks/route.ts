import { SetupContext, computed } from '@vue/composition-api'

export const useRoutes = (root: SetupContext['root']) => {
  const routeTimeline = computed(() => root.$route.name === 'timeline')
  const routeMedia = computed(() => routeTimeline.value)
  const routeHome = computed(() => root.$route.name === 'home')
  const routeSearch = computed(() => root.$route.name === 'search')

  return {
    routeHome,
    routeMedia,
    routeSearch,
    routeTimeline,
  }
}

export const useRouteParams = (root: SetupContext['root']) => {
  const currentId = computed(() => parseInt(root.$route.params.mediaId, 10))

  return {
    currentId,
  }
}
