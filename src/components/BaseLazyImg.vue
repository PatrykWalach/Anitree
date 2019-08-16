<template>
  <v-img v-lazy="changeInView" v-bind="{ ...$attrs, ...computed, lazySrc }">
    <slot :inView="inView"></slot>
    <template v-slot:placeholder>
      <slot name="placeholder" :inView="inView"></slot>
    </template>
  </v-img>
</template>

<script lang="ts">
import {
  createComponent,
  value as react,
  computed as get
} from 'vue-function-api'

export default createComponent({
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
  },
  setup(props) {
    const inView = react(false)

    const computed = get(() => {
      if (inView.value) {
        return {
          src: props.src,
          srcset: props.srcset
        }
      }
      return {}
    })

    const changeInView = () => {
      inView.value = true
    }

    return { inView, changeInView, computed }
  },
  props: ({
    src: {
      type: String,
      required: true
    },
    srcset: {
      type: String,
      default: ''
    },
    lazySrc: {
      type: String,
      default: ''
    }
  } as unknown) as Readonly<Props>
})
interface Props {
  lazySrc: string
  srcset: string
  src: string
}
</script>
