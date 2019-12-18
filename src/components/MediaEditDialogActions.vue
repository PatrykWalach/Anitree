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
      <v-card>
        <v-card-title>Warning</v-card-title>
        <v-card-text
          >Are you sure you want to delete this list entry?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click.stop="confirmation = false"
            >Cancel</v-btn
          >

          <v-btn text color="primary" @click.stop="remove">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-spacer></v-spacer>

    <v-btn text outlined color="primary" @click.stop="close">Cancel</v-btn>

    <v-btn
      :disabled="!submitRequired"
      depressed
      color="primary"
      @click.stop="submitAndClose"
      >Save</v-btn
    >
  </v-card-actions>
</template>
<script lang="ts">
import {
  State,
  useDeleteWithChanges,
  useActions as useStoreActions,
} from '@/store'
import { computed, createComponent, ref } from '@vue/composition-api'
import { useDispatch, useSelector } from 'vue-redux-hooks'
import { Media } from '@/graphql/schema/media'
import { User } from '@/graphql/schema/viewer'

import { useEdit } from '../store'

export interface Props {
  user: User
  media: Media
  submit: () => void
}

const useActions = (props: Readonly<Props>) => {
  const confirmation = ref(false)

  const dispatch = useDispatch()

  const {
    edit: { CHANGE_IS_EDITED },
  } = useStoreActions()

  const form = useSelector((state: State) => state.edit.form)

  const submitRequired = computed(() => !!Object.values(form.value).length)

  const { close } = useEdit()

  const submitAndClose = async () => {
    props.submit()
    dispatch(CHANGE_IS_EDITED(false))
  }

  const { mutate: deleteEntry } = useDeleteWithChanges()

  const remove = async () => {
    const { media } = props

    if (media.mediaListEntry) {
      confirmation.value = false

      deleteEntry(
        {
          id: media.mediaListEntry.id,
        },
        media.id,
      )

      dispatch(CHANGE_IS_EDITED(false))
    }
  }

  return { close, confirmation, remove, submitAndClose, submitRequired }
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
    user: { default: null, required: true, type: Object },
    submit: { default: null, required: true, type: Function },
  },
  setup(props) {
    return useActions(props)
  },
})
</script>
