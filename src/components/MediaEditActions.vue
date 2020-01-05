<template>
  <v-card-actions>
    <v-dialog v-model="confirmation" max-width="360">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :disabled="!media.mediaListEntry"
          color="error"
          text
          v-bind="attrs"
          v-on="on"
          >Delete</v-btn
        >
      </template>
      <v-card color="primary darken-1" dark>
        <v-card-title>Warning</v-card-title>
        <v-card-text
          >Are you sure you want to delete this list entry?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click.stop="confirmation = false"
            >Cancel</v-btn
          >

          <v-btn text color="accent" @click.stop="remove">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-spacer></v-spacer>

    <v-btn text outlined color="accent" @click.stop="close">Cancel</v-btn>

    <v-btn
      :disabled="!submitRequired"
      depressed
      color="accent"
      @click.stop="submitAndClose"
      >Save</v-btn
    >
  </v-card-actions>
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
import { useHandleError } from '@/hooks/changes'
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

  const mutation = useDeleteMediaListEntry()
  const dispatch = useDispatch()

  const deleteEntry = useHandleError(mutation, variables => {
    dispatch(
      changesActions.UNSHIFT_PENDING({
        type: 'DELETE',
        ...variables,
      }),
    )
  })

  const remove = () => {
    const mediaValue = media.value

    if (mediaValue.mediaListEntry) {
      confirmation.value = false

      deleteEntry({
        variables: { id: mediaValue.mediaListEntry.id },
        mediaId: mediaValue.id,
      })

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
