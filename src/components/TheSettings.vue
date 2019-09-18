<template>
  <v-card>
    <v-list subheader flat :three-line="$vuetify.breakpoint.xsOnly">
      <template v-if="!token">
        <v-subheader>Account</v-subheader>
        <TheSettingsLogin />
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
import { computed, createComponent } from '@vue/composition-api'
import TheSettingsSetting from '@/components/TheSettingsSetting.vue'
import TheSettingsTitle from '@/components/TheSettingsTitle.vue'
import { settings } from '@/store/settings'

const TheSettingsLogin = () => import('@/components/TheSettingsLogin.vue')

import { useTheme } from '@/App.vue'

export default createComponent({
  components: {
    TheSettingsLogin,
    TheSettingsSetting,
    TheSettingsTitle,
  },
  setup(_, context) {
    const {
      state: { token, syncChanges, cacheApollo, cacheChanges },
      mutations: {
        CHANGE_CACHE_APOLLO,
        CHANGE_CACHE_CHANGES,
        CHANGE_SYNC_CHANGES,
      },
    } = settings

    const { dark } = useTheme(context)

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

    return {
      cache,
      site,
      token,
    }
  },
})
</script>
