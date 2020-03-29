<template>
  <VList dense>
    <VListItem v-for="(variable, key) in changes" :key="key">
      <VListItemIcon>
        <VIcon>add</VIcon>
      </VListItemIcon>

      <VListItemContent>
        <VListItemTitle class="text-capitalize">
          {{ key }}
        </VListItemTitle>
        <VListItemSubtitle>
          {{ variable }}
        </VListItemSubtitle>
      </VListItemContent>
    </VListItem>
  </VList>
</template>

<script lang="ts">
import {
  DeletePending,
  SavePending,
  isSavePending,
} from '../store/reducers/changes'
import { computed, defineComponent } from '@vue/composition-api'

interface Props {
  pending: SavePending | DeletePending
}

export default defineComponent<Readonly<Props>>({
  props: {
    pending: {
      default: null,
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const changes = computed(() => {
      const pending = props.pending

      if (isSavePending(pending)) {
        const { ...variables } = pending.variables
        delete variables.mediaId
        delete variables.id
        return variables
      }
      const { ...variables } = pending.variables
      delete variables.id
      return variables
    })

    return {
      changes,
    }
  },
})
</script>
