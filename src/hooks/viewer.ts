import { Ref, inject } from '@vue/composition-api'
import { AppQuery } from '../__generated__/AppQuery'

export const DefaultViewer = Symbol('Viewer')

export const useViewer = <
  V = {
    result: Ref<AppQuery>
    loading: Ref<boolean>
    error: Ref<Error>
  }
>() => inject(DefaultViewer) as V
