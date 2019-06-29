<template>
  <v-card-title
    :style="{
      flex: 1,
      'align-items': 'stretch'
    }"
  >
    <div
      :style="{
        'max-width': '100%',
        display: 'flex',
        'flex-direction': 'column'
      }"
    >
      <BaseMediaTitleTitle :media="media" />
      <BaseMediaTitleSubheading :media="media" />
      <BaseMediaTitleDescription :media="media" />
    </div>
  </v-card-title>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { AMedia } from '../types'
import BaseMediaTitleDescription from './BaseMediaTitleDescription.vue'
import BaseMediaTitleSubheading from './BaseMediaTitleSubheading.vue'
import BaseMediaTitleTitle from './BaseMediaTitleTitle.vue'

@Component({
  components: {
    BaseMediaTitleDescription,
    BaseMediaTitleSubheading,
    BaseMediaTitleTitle
  }
})
export default class BaseMediaTitle extends Vue {
  @Prop()
  public readonly media!: AMedia

  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  }
}
</script>
