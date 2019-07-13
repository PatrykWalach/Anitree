<template>
  <v-img v-lazy="changeInView" v-bind="{ ...$attrs, ...computed, lazySrc }">
    <slot :inView="inView"></slot>
  </v-img>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component({
  directives: {
    lazy: {
      bind(el, { value }) {
        if (value) {
          new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                value(event)
                observer.disconnect()
              }
            })
          }).observe(el)
        }
      }
    }
  }
})
export default class MediaCardImg extends Vue {
  inView: boolean = false
  @Prop({ required: true })
  readonly src!: string

  @Prop({ required: false })
  readonly srcset!: string

  @Prop({ required: false })
  readonly lazySrc!: string

  get computed() {
    if (this.inView) {
      const { src, srcset } = this
      return {
        src,
        srcset
      }
    }
    return {
      //   src:undefined
    }
  }

  async changeInView() {
    this.inView = true
  }
}
</script>
