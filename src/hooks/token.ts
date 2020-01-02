import { State } from '@/store'

import { useSelector } from 'vue-redux-hooks'
export const useToken = () =>
  useSelector((state: State) => state.settings.token)
