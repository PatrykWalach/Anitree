<template>
  <v-tooltip v-if="action" v-bind="{ bottom, top }">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-on="{ ...on, ...action.on }"
        v-bind="{ ...attrs, ...action.bind }"
      >
        <v-icon>{{ action.icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ action.title }}</span>
  </v-tooltip>
  <component
    :is="$vuetify.breakpoint.xsOnly ? 'v-bottom-sheet' : 'v-menu'"
    :bottom="$vuetify.breakpoint.xsOnly ? undefined : true"
    :left="$vuetify.breakpoint.xsOnly ? undefined : true"
    v-else-if="actions.length"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-on="on" v-bind="attrs"><v-icon>more_vert</v-icon></v-btn>
    </template>
    <v-list :shaped="!$vuetify.breakpoint.xsOnly">
      <v-list-item
        v-for="{ title, on, bind, icon } in actions"
        v-bind="bind"
        v-on="on"
        :key="title"
      >
        <v-list-item-icon>
          <v-icon>
            {{ icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> {{ title }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </component>
</template>
<script lang="ts">
import { VBottomSheet, VMenu } from 'vuetify/lib'
import { computed, createComponent } from '@vue/composition-api'
import { NavigationElement } from '../types'

export interface Props {
  actions: NavigationElement[]
  top: boolean
  bottom: boolean
}

export default createComponent<Readonly<Props>>({
  components: { VBottomSheet, VMenu },
  props: {
    actions: { default: null, required: true, type: Array },
    bottom: { default: false, required: false, type: Boolean },
    top: { default: false, required: false, type: Boolean },
  },
  setup(props) {
    const action = computed(() => {
      const actions = props.actions

      return actions.length === 1 ? actions[0] : null
    })

    return {
      action,
    }
  },
})
</script>
