<template>
  <VCardActions>
    <VBtn
      v-if="!deleteType"
      icon
      @click.stop="syncedExtension = !syncedExtension"
    >
      <VIcon
        v-text="syncedExtension ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
      />
    </VBtn>
    <VSpacer />

    <VDialog v-model="showConfirmation" max-width="360">
      <template v-slot:activator="{ on, attrs }">
        <VBtn :disabled="loading" color="error" text v-bind="attrs" v-on="on">
          Discard
        </VBtn>
      </template>
      <VCard color="primary darken-1" dark>
        <VCardTitle>Warning</VCardTitle>
        <VCardText>
          Are you sure you want to discard this changes?
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn text color="error" @click.stop="showConfirmation = false">
            Cancel
          </VBtn>

          <VBtn text color="accent" @click.stop="discard">
            Ok
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VBtn outlined text color="accent" :disabled="loading" @click.stop="submit">
      Submit
    </VBtn>
  </VCardActions>
</template>

<script lang="ts">
import {
  DeletePending,
  SavePending,
  changesActions,
} from '../store/reducers/changes'
import { computed, createComponent, ref } from '@vue/composition-api'

import { useSync } from '@/hooks/sync'
import { useDispatch, useSelector } from 'vue-redux-hooks'
import { State } from '../store'
import { useMutationLoading } from '@vue/apollo-composable'
import { isSavePending } from '@/store/reducers/changes'
import { useSaveMediaListEntry } from '@/hooks/saveMediaListEntry'
import { useDeleteMediaListEntry } from '@/hooks/deleteMediaListEntry'

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

    const { mutate: saveEntry, onDone: onDoneSave } = useSaveMediaListEntry()
    const {
      mutate: deleteEntry,
      onDone: onDoneDelete,
    } = useDeleteMediaListEntry()

    onDoneSave(discard)
    onDoneDelete(discard)

    const submit = () => {
      const pending = props.pending
      if (isSavePending(pending)) {
        saveEntry(pending)
      } else {
        deleteEntry(pending)
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
