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

    <v-btn text color="primary" @click="close">Cancel</v-btn>

    <v-btn :disabled="!submitRequired" outlined color="primary" @click="submit"
      >Save</v-btn
    >
  </v-card-actions>
</template>
<script lang="ts">
import { computed, createComponent, ref } from '@vue/composition-api'
import useMutations, { DeleteCommand } from '../store/mutations'

import { Media } from '@/graphql/schema/media'
import MediaEditIcon from './MediaEditIcon.vue'
import { User } from '@/graphql/schema/viewer'
// import { DELETE_MEDIA_LIST_ENTRY } from '@/graphql'
import useEdit from '../store/edit'

export interface Props {
  user: User | null
  media: Media | null
}

function useActions(props: Readonly<Props>) {
  const confirmation = ref(false)

  const { close, form, submit: _submit, isEdited } = useEdit()

  const submitRequired = computed(() => !!Object.values(form.value).length)

  const submit = async () => {
    await _submit()
    isEdited.value = false
  }

  const remove = async () => {
    if (props.media && props.media.mediaListEntry) {
      confirmation.value = false
      await useMutations().dispatch(
        new DeleteCommand({
          variables: {
            id: props.media.mediaListEntry.id,
            mediaId: props.media.id
          }
        })
      )
      // await root.$apollo.mutate({
      //   mutation: DELETE_MEDIA_LIST_ENTRY,
      //   variables: { id: props.media.mediaListEntry.id }
      // })
      isEdited.value = false
    }
  }

  return { close, confirmation, remove, submit, submitRequired }
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaEditIcon
  },
  props: {
    media: { default: null, required: true, type: null },
    user: { default: null, required: true, type: null }
  },
  setup(props) {
    return useActions(props)
  }
})
</script>
