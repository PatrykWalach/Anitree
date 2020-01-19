<template>
  <VCardActions>
    <VDialog v-model="confirmation" max-width="360">
      <template v-slot:activator="{ on, attrs }">
        <VBtn
          :disabled="!media.mediaListEntry"
          color="error"
          text
          v-bind="attrs"
          v-on="on"
        >
          Delete
        </VBtn>
      </template>
      <VCard color="primary darken-1" dark>
        <VCardTitle>Warning</VCardTitle>
        <VCardText>
          Are you sure you want to delete this list entry?
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn text color="error" @click.stop="confirmation = false">
            Cancel
          </VBtn>

          <VBtn text color="accent" @click.stop="remove">
            Ok
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VSpacer />

    <VBtn text outlined color="accent" @click.stop="close">
      Cancel
    </VBtn>

    <VBtn
      :disabled="!submitRequired"
      depressed
      color="accent"
      @click.stop="submitAndClose"
    >
      Save
    </VBtn>
  </VCardActions>
</template>
<script lang="ts">
import {
  SetupContext,
  computed,
  createComponent,
  ref,
} from '@vue/composition-api'
import { Form } from '../types'

import { useDeleteMediaListEntry } from '@/hooks/deleteMediaListEntry'

import { changesActions } from '@/store/reducers/changes'
import { useSubmitRequired } from '@/hooks/submitRequired'
import { MediaEditActions_media } from './__generated__/MediaEditActions_media'
import { useDispatch } from 'vue-redux-hooks'

export interface Props {
  media: MediaEditActions_media
  form: Partial<Form>
  submit: () => void
}

const useActions = (props: Readonly<Props>, emit: SetupContext['emit']) => {
  const close = () => {
    emit('close')
  }

  const confirmation = ref(false)

  const media = computed(() => props.media)
  const mediaListEntry = computed(() => media.value.mediaListEntry || {})
  const form = computed(() => props.form)

  const submitRequired = useSubmitRequired(mediaListEntry, form)

  const submitAndClose = () => {
    props.submit()
    close()
  }

  const {
    mutate: deleteEntry,
    onError,
    variables,
    mediaId,
  } = useDeleteMediaListEntry(
    () => ({ id: media.value.mediaListEntry?.id }),
    () => media.value.id,
  )

  const dispatch = useDispatch()

  onError(() => {
    dispatch(
      changesActions.UNSHIFT_PENDING({
        type: 'DELETE',
        mediaId: mediaId.value,
        variables: variables.value,
      }),
    )
  })

  const remove = () => {
    if (media.value.mediaListEntry) {
      confirmation.value = false

      deleteEntry()

      close()
    }
  }

  return { close, confirmation, remove, submitAndClose, submitRequired }
}

export default createComponent<Readonly<Props>>({
  props: {
    form: { default: null, required: true, type: Object },
    media: { default: null, required: true, type: Object },
    submit: { default: null, required: true, type: Function },
  },
  setup(props, { emit }) {
    return useActions(props, emit)
  },
})
</script>
