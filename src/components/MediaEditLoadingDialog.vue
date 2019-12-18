<template>
  <v-card>
    <v-card-text class="pa-0">
      <MediaCardLoadingBanner />
      <MediaCardLoadingItem />
      <v-divider></v-divider>
      <MediaEditLoadingDialogTabs
        :style="{ position: 'sticky', top: 0, 'z-index': 2 }"
      />
      <template v-if="!token">
        <v-card-title>
          You are not logged in
        </v-card-title>
        <v-card-actions>
          <v-btn
            block
            color="primary"
            rel="noopener"
            :href="
              `https://anilist.co/api/v2/oauth/authorize?client_id=${appId}&response_type=token`
            "
          >
            Login with Anilist
          </v-btn>
        </v-card-actions>
      </template>
      <v-container v-else>
        <v-row justify="center" align="center">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <MediaEditLoadingDialogActions />
  </v-card>
</template>
<script lang="ts">
import MediaCardLoadingBanner from './MediaCardLoadingBanner.vue'
import MediaCardLoadingItem from './MediaCardLoadingItem.vue'
import MediaEditLoadingDialogActions from './MediaEditLoadingDialogActions.vue'
import MediaEditLoadingDialogTabs from './MediaEditLoadingDialogTabs.vue'
import { createComponent } from '@vue/composition-api'
import { useAccount } from './TheSettings.vue'
import { useViewer } from '@/graphql'

export default createComponent({
  components: {
    MediaCardLoadingBanner,
    MediaCardLoadingItem,
    MediaEditLoadingDialogActions,
    MediaEditLoadingDialogTabs,
  },
  setup() {
    const { id: appId } = useAccount()

    return {
      appId,
      ...useViewer(),
    }
  },
})
</script>
