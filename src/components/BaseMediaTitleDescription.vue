<template>
  <div v-observe="changeOffsetHeight" :style="{ flex: 1 }">
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
import { AMedia } from '../types'
import ResizeObserver from '@juggle/resize-observer'
import { ResizeObserverEntry } from '@juggle/resize-observer/lib/ResizeObserverEntry'

@Component({
  directives: {
    observe: {
      bind(el, { value }) {
        new ResizeObserver(entries => entries.forEach(value)).observe(el)
      }
    }
  }
})
export default class BaseMediaTitleDescription extends Vue {
  @Prop()
  public readonly media!: AMedia

  public wrapper: HTMLElement | null = null
  public offsetHeight: number = 18

  get lines() {
    return Math.floor(this.offsetHeight / 18)
  }

  public changeOffsetHeight(e: ResizeObserverEntry) {
    this.offsetHeight = e.contentBoxSize.blockSize
  }
}
</script>
