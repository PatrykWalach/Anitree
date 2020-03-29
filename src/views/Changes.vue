<template>
  <TheBackdrop :style="{ flex: 1, borderRadius: '4px 4px 0 0' }">
    <template v-slot:appBar>
      <ChangesAppBar />
    </template>
    <template v-slot:default>
      <div>
        <VContainer>
          <v-subheader>
            <template v-if="!pending.length">
              No pending changes
            </template>
            <template v-else>
              Pending changes:
            </template>
          </v-subheader>

          <v-row>
            <v-col v-for="request in pending" :key="request.id" cols="12">
              <ChangeCard :request="request" />
            </v-col>
          </v-row>
        </VContainer>
      </div>
    </template>
  </TheBackdrop>
</template>
<script lang="ts">
import ChangeCard from '@/components/ChangeCard.vue'
import { State } from '../store'
import { defineComponent } from '@vue/composition-api'
import { useSelector } from 'vue-redux-hooks'
import TheBackdrop from '@/components/TheBackdrop.vue'

const ChangesAppBar = () =>
  import(
    /* webpackChunkName: "ChangesAppBar" */ /* webpackPrefetch: true */ './ChangesAppBar.vue'
  )

export default defineComponent({
  components: { TheBackdrop, ChangeCard, ChangesAppBar },
  setup() {
    const pending = useSelector((state: State) => state.changes.pending)

    return {
      pending,
    }
  },
})
</script>
