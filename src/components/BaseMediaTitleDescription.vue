<template>
  <div v-observe="offsetHeight" :style="{ flex: 1 }">
    <span
      class="caption"
      :style="{
        display: '-webkit-box',
        '-webkit-line-clamp': lines,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden'
      }"
      v-html="media.description"
    >
    </span>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'
import ResizeObserver from '@juggle/resize-observer'

@Component({
  directives: {
    // observe: {
    //   bind(el, { value }) {
    //     new ResizeObserver(entries => entries.forEach(value)).observe(el)
    //   }
    // }
    observe: {
      bind(el, { expression }, { context }) {
        new ResizeObserver(entries =>
          entries.forEach(entry => {
            if (context) {
              Vue.set(context, expression, entry.contentBoxSize.blockSize)
            }
          })
        ).observe(el)
      }
    }
  }
})
export default class BaseMediaTitleDescription extends Vue {
  @Prop()
  public readonly media!: Media

  public offsetHeight: number = 18

  get lines() {
    return Math.floor(this.offsetHeight / 18)
  }

  // public changeOffsetHeight(entry: ResizeObserverEntry) {
  //   this.offsetHeight = entry.contentBoxSize.blockSize
  // }
}
</script>
