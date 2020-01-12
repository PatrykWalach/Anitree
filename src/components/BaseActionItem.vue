<template>
  <VListItem v-bind="$attrs" v-on="$listeners">
    <VTooltip v-if="tooltip" :[right]="true">
      <template v-slot:activator="{ on, attrs }">
        <VListItemIcon v-bind="attrs" v-on="on">
          <VIcon :color="iconColor" v-text="icon" />
        </VListItemIcon>
      </template>
      <span class="text-capitalize" v-text="tooltip" />
    </VTooltip>
    <VListItemIcon v-else>
      <VIcon :color="iconColor" v-text="icon" />
    </VListItemIcon>

    <VListItemContent>
      <VListItemTitle class="text-capitalize" v-text="title || icon" />
    </VListItemContent>
  </VListItem>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

export default createComponent({
  inheritAttrs: false,
  props: {
    icon: { default: '', required: true, type: String },
    iconColor: { default: '', required: false, type: String },
    left: { default: false, required: false, type: Boolean },
    title: { default: '', required: false, type: String },
    tooltip: { default: '', required: false, type: String },
  },
  setup(props) {
    return {
      right: computed(() => (props.left ? 'right' : 'left')),
    }
  },
})
</script>
