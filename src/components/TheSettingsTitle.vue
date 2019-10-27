<template>
  <v-list-item @click.stop>
    <component
      :is="$vuetify.breakpoint.xsOnly ? 'v-bottom-sheet' : 'v-dialog'"
      v-model="dialog"
      :max-width="$vuetify.breakpoint.xsOnly ? undefined : '320px'"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item-content v-bind="attrs" v-on="on">
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
              :key="title"
              v-slot="{ active }"
              :value="title"
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
          <v-btn text @click.stop="dialog = false">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </component>
  </v-list-item>
</template>

<script lang="ts">
import { VBottomSheet, VDialog } from 'vuetify/lib'
import { computed, createComponent, ref } from '@vue/composition-api'

export default createComponent({
  components: {
    VBottomSheet,
    VDialog,
  },
  setup(_, { root }) {
    const dialog = ref(false)

    const {
      getPreferedTitle,
      titles,
      changePreferedTitle,
    } = root.$modules.title

    const preferedTitle = computed({
      get: () => getPreferedTitle.value,
      set: changePreferedTitle,
    })

    return {
      dialog,
      preferedTitle,
      titles,
    }
  },
})
</script>
