<template>
  <v-card>
    <v-list v-if="!token" subheader flat two-line>
      <v-subheader>Account</v-subheader>
      <TheSettingsLogin />
    </v-list>
    <v-list subheader flat two-line>
      <v-subheader>Site</v-subheader>
      <TheSettingsTitle />

      <v-list-item-group v-model="site" multiple>
        <the-settings-setting title="Theme">
          <template v-slot:subtitle="{ active }"
            >{{ active ? 'dark' : ' light ' }}
          </template>
        </the-settings-setting>

        <the-settings-setting title="Autosave">
          <template v-slot:subtitle="{ active }"
            >Changes made to the list entry are{{
              active ? ' ' : ' not '
            }}autosaved
          </template>
        </the-settings-setting>
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>
    <v-list subheader flat two-line>
      <v-subheader>Cache</v-subheader>
      <v-list-item-group v-model="cache" multiple>
        <TheSettingsSetting
          title="Cache data (Recommended)"
          subtitle="Data Cache improves load times by caching all data to your browser's local storage.This may put more pressure on your CPU and memory."
        />

        <TheSettingsSetting
          title="Cache changes"
          subtitle="Required for syncing changes made offline"
        />
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
// import TheSettingsTheme from '@/components/TheSettingsTheme.vue'
import TheSettingsTitle from '@/components/TheSettingsTitle.vue'
import TheSettingsSetting from '@/components/TheSettingsSetting.vue'

const TheSettingsLogin = () => import('@/components/TheSettingsLogin.vue')

import { createComponent, computed, SetupContext } from '@vue/composition-api'

import useSettings from '@/store/settings'

export const useTheme = ({ root }: SetupContext) => {
  const dark = computed({
    get: () => root.$vuetify.theme.dark,
    set: dark => {
      root.$vuetify.theme.dark = dark
      localStorage.setItem('THEME', dark.toString())
    }
  })
  return { dark }
}

export default createComponent({
  components: {
    // TheSettingsTheme,
    TheSettingsLogin,
    TheSettingsSetting,
    TheSettingsTitle
  },
  setup(_, context) {
    const {
      token,

      syncChanges,
      cacheApollo,
      cacheChanges
    } = useSettings()

    const { dark } = useTheme(context)

    const site = computed({
      get: () =>
        ([] as number[]).concat(
          dark.value ? [0] : [],
          syncChanges.value ? [1] : []
        ),
      set: a => {
        dark.value = !!a.includes(0)
        syncChanges.value = !!a.includes(1)
      }
    })

    const cache = computed({
      get: () =>
        ([] as number[]).concat(
          cacheApollo.value ? [0] : [],
          cacheChanges.value ? [1] : []
        ),

      set: a => {
        cacheApollo.value = !!a.includes(0)
        cacheChanges.value = !!a.includes(1)
      }
    })

    return {
      token,
      site,
      cache
    }
  }
})
</script>
