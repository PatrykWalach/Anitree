import { mergeDeep } from 'apollo-utilities'

import { SaveVariables } from '@/graphql/schema/listEntry'

import CompositionApi, { Ref, ref } from '@vue/composition-api'

import useSettings from './settings'
import Vue from 'vue'
import { Form } from '@/types'
import useMutations, { SaveCommand } from './mutations'

Vue.use(CompositionApi)

const mediaId: Ref<number | null> = ref(null)
const isEdited = ref(false)
const loading = ref(false)
const form: Ref<Partial<Form>> = ref({})

const tabs = ref([
  { href: 'edit1', icon: 'dashboard', title: 'Progress' },
  { href: 'edit2', icon: 'date_range', title: 'Dates' },
  { href: 'edit3', icon: 'insert_comment', title: 'Notes' },
  { href: 'edit4', icon: 'edit', title: ' Advanced Scores' }
])

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

    await useMutations().dispatch(
      new SaveCommand({
        variables: { mediaId: mediaId.value, ...form.value }
      })
    )

    await RESET_FORM()
    loading.value = false
  }
}

const changeForm = async (form: Partial<SaveVariables>) => {
  await CHANGE_FORM(form)
  if (useSettings().syncChanges.value) {
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
    tab,
    tabs
  }
}
