<template>
  <v-card-actions>
    <!-- <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">
          {{ auto ? 'sync' : 'sync_disabled' }}
        </v-icon>
      </template>
      <span>{{ caption }}</span>
    </v-tooltip> -->

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
          <v-btn text color="error" @click="confirmation = false">Cancel</v-btn>

          <v-btn text color="primary" @click="remove">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-spacer></v-spacer>

    <v-btn text color="primary" @click.stop="close">Cancel</v-btn>

    <v-btn
      :disabled="!submitRequired"
      outlined
      color="primary"
      @click.stop="submit"
      >Save</v-btn
    >
  </v-card-actions>
</template>
<script lang="ts">
import MediaEditIcon from './MediaEditIcon.vue'

import { Media } from '@/apollo/schema/media'
import { DELETE_MEDIA_LIST_ENTRY } from '@/apollo'
import {
  createComponent,
  value as binding,
  computed,
  SetupContext
} from 'vue-function-api'
import { User } from '../apollo/schema/viewer'
import useEdit from '../store/edit'

interface Props {
  user: User | null
  media: Media | null
}

function useActions(props: Props, { root }: SetupContext) {
  const confirmation = binding(false)

  const { close, form, submit: _submit, CHANGE_IS_EDITED } = useEdit()

  const submitRequired = computed(() => !!Object.values(form.value).length)

  const submit = async () => {
    await _submit()

    CHANGE_IS_EDITED(false)
  }

  const remove = async () => {
    if (props.media && props.media.mediaListEntry) {
      confirmation.value = false
      await root.$apollo.mutate({
        mutation: DELETE_MEDIA_LIST_ENTRY,
        variables: { id: props.media.mediaListEntry.id }
      })
      CHANGE_IS_EDITED(false)
    }
  }

  return { confirmation, close, submitRequired, submit, remove }
}

export default createComponent({
  components: {
    MediaEditIcon
  },
  props: ({
    user: { required: true },
    media: { required: true }
  } as unknown) as Readonly<Props>,
  setup(props, context) {
    return useActions(props, context)
  }
})
</script>
