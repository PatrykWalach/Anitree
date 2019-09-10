<template>
  <v-img v-lazy="changeInView" v-bind="{ ...$attrs, ...get, lazySrc }">
    <slot :inView="inView"></slot>
    <template v-slot:placeholder>
      <slot name="placeholder" :inView="inView"></slot>
    </template>
  </v-img>
</template>

<script lang="ts">
import { computed, createComponent, ref } from '@vue/composition-api'
import { DirectiveOptions } from 'vue'

export const lazy: DirectiveOptions = {
  bind(el, { value }) {
    if (value) {
      new IntersectionObserver((entries, observer) =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            value(event)
            observer.disconnect()
          }
        })
      ).observe(el)
    }
  }
}

export default createComponent<Readonly<Props>>({
  directives: {
    lazy
  },

  props: {
    lazySrc: {
      default: '',
      required: false,
      type: String
    },
    src: {
      default: '',
      required: true,
      type: String
    },
    srcset: {
      default: '',
      required: false,
      type: String
    }
  },
  setup(props) {
    const inView = ref(false)

    const get = computed(() => {
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

    return { changeInView, get, inView }
  }
})

export interface Props {
  lazySrc: string
  srcset: string
  src: string
}
</script>
