<template>
  <v-img v-lazy="changeInView" v-bind="{ ...$attrs, ...computed, lazySrc }">
    <slot :inView="inView"></slot>
    <template v-slot:placeholder>
      <slot name="placeholder" :inView="inView"></slot>
    </template>
  </v-img>
</template>

<script lang="ts">
import { ref, computed as get, createComponent } from 'vue-function-api'

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
  setup(props: Readonly<Props>) {
    const inView = ref(false)

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
  props: {
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
  }
})
interface Props {
  lazySrc: string
  srcset: string
  src: string
}
</script>
