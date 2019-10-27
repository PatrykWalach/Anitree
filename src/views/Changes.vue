<template>
  <v-container>
    <v-subheader>
      <template v-if="!history.length">
        No changes made recently
      </template>
      <template v-else>
        Recent changes:
        <v-spacer></v-spacer>
        <v-btn @click.stop="undo()">Undo</v-btn>
      </template>
    </v-subheader>

    <v-row>
      <v-col
        v-for="command in history.slice().reverse()"
        :key="command.id"
        cols="12"
      >
        <ChangeCard :command="command"></ChangeCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import ChangeCard from '@/components/ChangeCard.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: { ChangeCard },
  setup(_, { root }) {
    const { history, undo } = root.$modules.commands

    return {
      history,
      undo,
    }
  },
})
</script>
