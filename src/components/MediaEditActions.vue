<template>
  <v-card-actions>
    <v-dialog v-model="confirmation" max-width="360">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :disabled="!(user && media && media.mediaListEntry)"
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
      @click.stop="submit"
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

import { useCommands, useEdit } from '../store'
import { useStore,useState } from '@/store'
import { DeleteCommand } from '@/store/modules/commands/DeleteCommand'

import { Media } from '@/graphql/schema/media'
import { User } from '@/graphql/schema/viewer'



export interface Props {
  user: User | null
  media: Media | null
}

const useActions = (props: Readonly<Props>, { root }: SetupContext) => {
  const confirmation = ref(false)

  const {
    dispatch,
    actions: {
      edit: { CHANGE_IS_EDITED },
    },
  } = useStore()

  const form = useState(state => state.edit.form)

  const submitRequired = computed(() => !!Object.values(form.value).length)

  const { submit: dispatchSubmit, close } = useEdit()

  const submit = async () => {
    await dispatchSubmit(root.$apollo)
    dispatch(CHANGE_IS_EDITED(false))
  }
  const { add } = useCommands()
  const remove = async () => {
    const { media } = props

    if (media && media.mediaListEntry) {
      confirmation.value = false
      await add(
        new DeleteCommand({
          apollo: root.$apollo,
          variables: {
            id: media.mediaListEntry.id,
            mediaId: media.id,
          },
        }),
      )

      dispatch(CHANGE_IS_EDITED(false))
    }
  }

  return { close, confirmation, remove, submit, submitRequired }
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: null },
    user: { default: null, required: true, type: null },
  },
  setup(props, context) {
    return useActions(props, context)
  },
})
</script>
