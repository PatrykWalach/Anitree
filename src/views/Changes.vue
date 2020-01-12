<template>
  <TheBackdrop>
    <template v-slot:backdrop>
      <ChangesBackdrop />
    </template>
    <template v-slot:appBar>
      <ChangesAppBar />
    </template>
    <template v-slot:default>
      <VCard :style="{ flex: 1, borderRadius: '4px 4px 0 0' }">
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
      </VCard>
    </template>
  </TheBackdrop>
</template>
<script lang="ts">
import ChangeCard from '@/components/ChangeCard.vue'
import { State } from '../store'
import { createComponent } from '@vue/composition-api'
import { useSelector } from 'vue-redux-hooks'
import TheBackdrop from '@/components/TheBackdrop.vue'

const ChangesAppBar = () =>
  import(
    /* webpackChunkName: "ChangesAppBar" */ /* webpackPrefetch: true */ './ChangesAppBar.vue'
  )
const ChangesBackdrop = () =>
  import(
    /* webpackChunkName: "ChangesBackdrop" */ /* webpackPrefetch: true */ './ChangesBackdrop.vue'
  )

export default createComponent({
  components: { TheBackdrop, ChangeCard, ChangesBackdrop, ChangesAppBar },
  setup() {
    const pending = useSelector((state: State) => state.changes.pending)

    return {
      pending,
    }
  },
})
</script>
