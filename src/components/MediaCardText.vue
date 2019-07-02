<template>
  <v-card-text>
    <div
      :style="{
        flex: 1,
        display: 'flex',
        'align-items': 'flex-start',
        position: 'relative'
      }"
    >
      <div
        v-observe="changeCaptionHeight"
        :style="{
          display: '-webkit-box',
          '-webkit-line-clamp': lines,
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden'
        }"
        class="caption"
        v-html="media.description"
      >
        <!-- <div
        v-observe="changeCaptionHeight"
        class="caption"
        v-html="media.description"
      ></div> -->
      </div>
      <v-btn
        v-if="more"
        :style="{ bottom: '-10px', right: '-10px' }"
        absolute
        small
        flat
        icon
        @click="changeShown"
        ><v-icon small>{{
          !shown ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
        }}</v-icon></v-btn
      >
    </div>
  </v-card-text>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'
import ResizeObserver from '@juggle/resize-observer'
import { ResizeObserverEntry } from '@juggle/resize-observer/lib/ResizeObserverEntry'

@Component({
  directives: {
    observe: {
      bind(el, { value, modifiers, expression }, context) {
        new ResizeObserver(entries =>
          entries.forEach(entry => {
            if (modifiers.sync) {
              Vue.set(context, expression, entry)
            } else {
              value(entry)
            }
          })
        ).observe(el)
      }
    }
  }
})
export default class MediaCardText extends Vue {
  @Prop({ required: true })
  public readonly media!: Media

  public captionHeight: number = 18

  shown: boolean = false

  get more() {
    return this.captionHeight > 18
  }

  get lines() {
    if (this.shown) return undefined
    return 1
  }

  public changeCaptionHeight(entry: ResizeObserverEntry) {
    this.captionHeight = entry.target.scrollHeight
  }

  public changeShown() {
    this.shown = !this.shown
  }
}
</script>
