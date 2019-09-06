<template>
  <v-container>
    <v-subheader>
      <template v-if="!commands.length">
        No changes made recently
      </template>
      <template v-else>
        Recent changes:
        <v-spacer></v-spacer>
        <v-btn @click="commands[commands.length - 1].undo()">Undo</v-btn>
      </template>
    </v-subheader>

    <v-row>
      <v-col
        cols="12"
        v-for="command in commands.slice().reverse()"
        :key="command.id"
      >
        <ChangeCard :command="command"></ChangeCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import useMutations from '@/store/mutations'
import useTitle from '@/store/title'
import { createComponent } from '@vue/composition-api'
import ChangeCard from '@/components/ChangeCard.vue'

export default createComponent({
  components: { ChangeCard },
  setup() {
    const { elements: commands } = useMutations()
    const { title } = useTitle()

    return {
      commands,
      title
    }
  }
})
</script>
