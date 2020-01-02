<template>
  <v-container>
    <v-subheader>
      <template v-if="!pending.length">
        No pending changes
      </template>
      <template v-else>
        Pending changes:
        <!--   <v-spacer></v-spacer>
        <v-btn @click.stop="undo()">Undo</v-btn>
     -->
      </template>
    </v-subheader>

    <v-row>
      <v-col v-for="request in pending" :key="request.id" cols="12">
        <ChangeCard :request="request" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import ChangeCard from '@/components/ChangeCard.vue'
import { State } from '../store'
import { createComponent } from '@vue/composition-api'
import { useSelector } from 'vue-redux-hooks'

export default createComponent({
  components: { ChangeCard },
  setup() {
    const pending = useSelector((state: State) => state.changes.pending)

    return {
      pending,
    }
  },
})
</script>
