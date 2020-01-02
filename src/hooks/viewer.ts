import { inject } from '@vue/composition-api'
import { useQuery } from '@vue/apollo-composable'
export const DefaultViewer = Symbol('Viewer')

export const useViewer = <V = ReturnType<typeof useQuery>>() =>
  inject(DefaultViewer) as V
