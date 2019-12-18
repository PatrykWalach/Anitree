<template>
  <v-card-actions>
    <v-btn v-if="!deleteType" icon @click="syncedExtension = !syncedExtension"
      ><v-icon>{{
        syncedExtension ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
      }}</v-icon></v-btn
    >
    <v-spacer></v-spacer>
    <v-btn text color="error" :disabled="loading" @click="discard">
      Discard
    </v-btn>
    <v-btn outlined text color="accent" :disabled="loading" @click="submit">
      Submit
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts">
import { DeletePending, SavePending } from '../store/modules/changes'
import { State, useActions, useChanges, useDelete, useSave } from '../store'
import { computed, createComponent } from '@vue/composition-api'
import { useDispatch, useSelector } from 'vue-redux-hooks'
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
    const syncedExtension = computed({
      get: () => props.extension,
      set: value => emit('update:extension', value),
    })
    const dispatch = useDispatch()
    const actions = useActions()

    const indexOf = useSelector((state: State) =>
      state.changes.pending.indexOf(props.pending),
    )

    const discard = () => {
      if (indexOf.value !== -1) {
        dispatch(actions.changes.SPLICE_PENDING(indexOf.value))
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

    return {
      deleteType,
      discard,
      loading,
      submit,
      syncedExtension,
    }
  },
})
</script>
