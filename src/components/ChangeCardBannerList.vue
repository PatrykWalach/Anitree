<template>
  <v-list dense>
    <v-list-item v-for="(variable, key) in changes" :key="key">
      <v-list-item-icon>
        <v-icon>add</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title class="text-capitalize">
          {{ key }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ variable }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { DeletePending, SavePending } from '../store/modules/changes'
import { computed, createComponent } from '@vue/composition-api'
import { useChanges } from '../store'

interface Props {
  pending: SavePending | DeletePending
}

export default createComponent<Readonly<Props>>({
  props: {
    pending: {
      default: null,
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const { isSavePending } = useChanges()

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
