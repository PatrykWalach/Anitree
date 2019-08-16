import { mergeDeep } from 'apollo-utilities'
import apollo from '@/apollo'

import { SaveVariables } from '@/apollo/schema/listEntry'

import { MediaList } from '@/apollo/schema/mediaListCollection'

import { SAVE_MEDIA_LIST_ENTRY } from '@/apollo'

import { Wrapper, value as binding, plugin, computed } from 'vue-function-api'

import useSubmit from './submit'
import Vue from 'vue'
Vue.use(plugin)

const mediaId: Wrapper<number | null> = binding(null)
const _isEdited = binding(false)
const loading = binding(false)
const form: Wrapper<Partial<SaveVariables>> = binding({})
const _tab = binding('edit1')

const CHANGE_MEDIA_ID = (payload: number | null) => {
  mediaId.value = payload
}

const CHANGE_TAB = (payload: string) => {
  _tab.value = payload
}

const CHANGE_LOADING = (payload: boolean) => {
  loading.value = payload
}

const CHANGE_IS_EDITED = (payload: boolean) => {
  _isEdited.value = payload
}

const CHANGE_FORM = (payload: Partial<SaveVariables>) => {
  form.value = mergeDeep(form.value, payload)
}

const RESET_FORM = () => {
  form.value = {}
}

const isEdited = computed(() => _isEdited.value, CHANGE_IS_EDITED)
const tab = computed(() => _tab.value, CHANGE_TAB)

const open = async (mediaId: number) =>
  Promise.all([CHANGE_MEDIA_ID(mediaId), CHANGE_IS_EDITED(true)])

const close = async () => Promise.all([CHANGE_IS_EDITED(false), RESET_FORM()])

const submit = async () => {
  if (mediaId.value) {
    CHANGE_LOADING(true)
    await apollo.mutate<MediaList, SaveVariables>({
      mutation: SAVE_MEDIA_LIST_ENTRY,
      variables: { mediaId: mediaId.value, ...form.value }
    })
    await RESET_FORM()
    return CHANGE_LOADING(false)
  }
}

const changeForm = async (form: Partial<SaveVariables>) => {
  await CHANGE_FORM(form)
  if (useSubmit().auto.value) {
    submit()
  }
}
export default function useEdit() {
  return {
    mediaId,
    _tab,
    _isEdited,
    isEdited,
    CHANGE_FORM,
    CHANGE_IS_EDITED,
    CHANGE_LOADING,
    CHANGE_MEDIA_ID,
    CHANGE_TAB,
    changeForm,
    close,
    form,
    loading,
    open,
    RESET_FORM,
    submit,
    tab
  }
}
