<template>
  <v-card-actions>
    <v-btn
      v-if="!deleteType"
      icon
      @click.stop="syncedExtension = !syncedExtension"
      ><v-icon>{{
        syncedExtension ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
      }}</v-icon></v-btn
    >
    <v-spacer></v-spacer>
    <!-- <v-btn text color="error" :disabled="loading" @click.stop="discard">
      Discard
    </v-btn> -->

    <v-dialog v-model="showConfirmation" max-width="360">
      <template v-slot:activator="{ on, attrs }">
        <v-btn :disabled="loading" color="error" text v-bind="attrs" v-on="on"
          >Discard</v-btn
        >
      </template>
      <v-card color="primary darken-1" dark>
        <v-card-title>Warning</v-card-title>
        <v-card-text
          >Are you sure you want to discard this changes?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click.stop="showConfirmation = false"
            >Cancel</v-btn
          >

          <v-btn text color="accent" @click.stop="discard">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn
      outlined
      text
      color="accent"
      :disabled="loading"
      @click.stop="submit"
    >
      Submit
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts">
import {
  DeletePending,
  SavePending,
  changesActions,
} from '../store/reducers/changes'
import { computed, createComponent, ref } from '@vue/composition-api'
import { useChanges, useDelete, useSave } from '@/hooks/changes'
import { useSync } from '@/hooks/sync'
import { useDispatch, useSelector } from 'vue-redux-hooks'
import { State } from '../store'
import { useMutationLoading } from '@vue/apollo-composable'

interface Props {
  pending: SavePending | DeletePending
  extension: boolean
}

export default createComponent<Readonly<Props>>({
  props: {
    extension: {
      default: false,
      required: true,
      type: Boolean,
    },
    pending: {
      default: null,
      required: true,
      type: Object,
    },
  },
  setup(props, { emit }) {
    const syncedExtension = useSync(props, 'extension', emit)
    // computed({
    //   get: () => props.extension,
    //   set: value => emit('update:extension', value),
    // })

    const dispatch = useDispatch()

    const indexOf = useSelector((state: State) =>
      state.changes.pending.indexOf(props.pending),
    )

    const discard = () => {
      if (indexOf.value !== -1) {
        dispatch(changesActions.SPLICE_PENDING(indexOf.value))
      }
    }

    const loading = useMutationLoading()

    const { mutate: saveEntry, onDone: onDoneSave } = useSave()
    const { mutate: deleteEntry, onDone: onDoneDelete } = useDelete()

    const { isSavePending } = useChanges()

    onDoneSave(discard)
    onDoneDelete(discard)

    const submit = () => {
      const pending = props.pending
      if (isSavePending(pending)) {
        saveEntry(pending.variables, pending.mediaId)
      } else {
        deleteEntry(pending.variables, pending.mediaId)
      }
    }

    const deleteType = computed(() => props.pending.type === 'DELETE')

    const showConfirmation = ref(false)

    return {
      deleteType,
      discard,
      loading,
      showConfirmation,
      submit,
      syncedExtension,
    }
  },
})
</script>
