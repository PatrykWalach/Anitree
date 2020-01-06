import { Ref, inject } from '@vue/composition-api'
import { NavigationGuard } from 'vue-router'

export type Fab = {
  icon: string
  on: () => any
  title: string
}
export const DefaultFab = Symbol('fab')
export const useFab = <F extends Fab | null = Fab | null>() =>
  inject(DefaultFab) as Ref<F>

export const createBeforeRouteEnter = (
  fab: (vm: any) => Fab,
): NavigationGuard => (to, from, next) => {
  next((vm: any) => {
    vm.fab = fab(vm)
  })
}

export const beforeRouteLeave: NavigationGuard = function(
  this: { fab: Fab | null },
  to,
  from,
  next,
) {
  this.fab = null
  next()
}
