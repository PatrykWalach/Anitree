import { mergeDeep } from 'apollo-utilities'
import apollo from '@/graphql'

import { SaveVariables } from '@/graphql/schema/listEntry'

import { MediaList } from '@/graphql/schema/mediaListCollection'

import { SAVE_MEDIA_LIST_ENTRY } from '@/graphql'

import CompositionApi, { Ref, ref } from '@vue/composition-api'

import useSubmit from './submit'
import Vue from 'vue'
Vue.use(CompositionApi)

const mediaId: Ref<number | null> = ref(null)
const isEdited = ref(false)
const loading = ref(false)
const form: Ref<Partial<SaveVariables>> = ref({})
const tab = ref('edit1')

const CHANGE_FORM = (payload: Partial<SaveVariables>) => {
  form.value = mergeDeep(form.value, payload)
}

const RESET_FORM = () => {
  form.value = {}
}

const open = (_mediaId: number) => {
  mediaId.value = _mediaId
  isEdited.value = true
}

const close = async () => {
  isEdited.value = false
  RESET_FORM()
}

const submit = async () => {
  if (mediaId.value) {
    loading.value = true
    await apollo.mutate<MediaList, SaveVariables>({
      mutation: SAVE_MEDIA_LIST_ENTRY,
      variables: { mediaId: mediaId.value, ...form.value }
    })
    await RESET_FORM()
    loading.value = false
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
    isEdited,
    CHANGE_FORM,
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
