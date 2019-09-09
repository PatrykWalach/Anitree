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
            >Title language</v-list-item-title
          >
          <v-list-item-subtitle
            >Specify language preferences for titles</v-list-item-subtitle
          >
        </v-list-item-content>
      </template>

      <v-card>
        <v-card-title>
          Title language
        </v-card-title>
        <v-divider v-if="$vuetify.breakpoint.xsOnly"></v-divider>
        <v-list flat>
          <v-list-item-group v-model="preferedTitle" @change="dialog = false">
            <v-list-item
              v-for="title in titles"
              :value="title"
              :key="title"
              v-slot="{ active }"
            >
              <v-list-item-action>
                <v-checkbox v-model="active"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="text-capitalize">
                  {{ title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-card-actions v-if="!$vuetify.breakpoint.xsOnly"
          ><v-spacer> </v-spacer>
          <v-btn text @click="dialog = false">cancel</v-btn>
        </v-card-actions>
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

    return {
      preferedTitle,
      titles,
      dialog
    }
  }
})
</script>
