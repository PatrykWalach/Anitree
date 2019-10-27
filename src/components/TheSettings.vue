<template>
  <v-card>
    <v-list subheader flat :three-line="$vuetify.breakpoint.xsOnly">
      <template v-if="!token && id">
        <v-subheader>Account</v-subheader>
        <TheSettingsSetting
          :action="false"
          rel="noopener"
          :href="
            `https://anilist.co/api/v2/oauth/authorize?client_id=${id}&response_type=token`
          "
          title="Login"
          subtitle="Login with AniList"
        />
        <v-divider></v-divider>
      </template>

      <v-subheader>Site</v-subheader>
      <TheSettingsTitle />
      <v-divider v-if="$vuetify.breakpoint.xsOnly"></v-divider>
      <v-list-item-group v-model="site" multiple>
        <TheSettingsSetting
          title="Dark theme"
          :subtitle="
            `Reduce glare &
        improve night viewing`
          "
        />
        <v-divider v-if="$vuetify.breakpoint.xsOnly"></v-divider>
        <TheSettingsSetting
          title="Autosave"
          subtitle="Make changes without confirmation"
        />
      </v-list-item-group>
      <v-divider></v-divider>

      <v-subheader>Cache</v-subheader>
      <v-list-item-group v-model="cache" multiple>
        <TheSettingsSetting
          title="Store data"
          subtitle="Improve load times by caching all data to local storage."
        />
        <v-divider v-if="$vuetify.breakpoint.xsOnly"></v-divider>
        <TheSettingsSetting
          title="Store changes"
          subtitle="Save changes between sessions. Sync changes made offline."
        />
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { SetupContext, computed, createComponent } from '@vue/composition-api'
import { useAccount, useTheme } from '@/mixins'
import TheSettingsSetting from '@/components/TheSettingsSetting.vue'
import TheSettingsTitle from '@/components/TheSettingsTitle.vue'

const useCache = (root: SetupContext['root']) => {
  const {
    cacheApollo,
    cacheChanges,
    CHANGE_CACHE_APOLLO,
    CHANGE_CACHE_CHANGES,
  } = root.$modules.settings

  const cache = computed({
    get: () =>
      ([] as number[]).concat(
        cacheApollo.value ? [0] : [],
        cacheChanges.value ? [1] : [],
      ),

    set: a => {
      CHANGE_CACHE_APOLLO(!!a.includes(0))
      CHANGE_CACHE_CHANGES(!!a.includes(1))
    },
  })

  return { cache }
}

const useSite = (root: SetupContext['root']) => {
  const { syncChanges, CHANGE_SYNC_CHANGES } = root.$modules.settings

  const { dark } = useTheme(root)

  const site = computed({
    get: () =>
      ([] as number[]).concat(
        dark.value ? [0] : [],
        syncChanges.value ? [1] : [],
      ),
    set: a => {
      dark.value = !!a.includes(0)
      CHANGE_SYNC_CHANGES(!!a.includes(1))
    },
  })

  return { site }
}

export default createComponent({
  components: {
    TheSettingsSetting,
    TheSettingsTitle,
  },
  setup: (_, { root }) => ({
    ...useAccount(root),
    ...useCache(root),
    ...useSite(root),
  }),
})
</script>
