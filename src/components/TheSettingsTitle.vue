<template>
  <v-list-item @click.stop>
    <component
      v-model="dialog"
      :is="$vuetify.breakpoint.xsOnly ? 'v-bottom-sheet' : 'v-dialog'"
      :max-width="$vuetify.breakpoint.xsOnly ? undefined : '320px'"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item-content v-on="on" v-bind="attrs">
          <v-list-item-title class="text-capitalize"
            >Title language - {{ preferedTitle }}</v-list-item-title
          >
          <v-list-item-subtitle
            >Select your prefered language for all the
            titles</v-list-item-subtitle
          >
        </v-list-item-content>
      </template>

      <v-card>
        <v-card-title>
          Select prefered language
        </v-card-title>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group @change="changePreferedTitle">
            <v-list-item v-for="title in titles" :value="title" :key="title">
              <v-list-item-content>
                <v-list-item-title>
                  {{ title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </component>
  </v-list-item>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import useTitle from '@/store/title'
import { VDialog, VBottomSheet } from 'vuetify/lib'

export default createComponent({
  components: {
    VDialog,
    VBottomSheet
  },
  setup() {
    const dialog = ref(false)
    const { preferedTitle, titles } = useTitle()

    const changePreferedTitle = (title: 'native' | 'romaji' | 'english') => {
      dialog.value = false
      preferedTitle.value = title
    }

    return {
      preferedTitle,
      titles,
      dialog,
      changePreferedTitle
    }
  }
})
</script>
