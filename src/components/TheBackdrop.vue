<script lang="ts">
import {
  defineComponent,
  createElement as h,
  computed,
  ref,
} from '@vue/composition-api'
import { useReducer } from '@/hooks/reducer'
import {
  VIcon,
  VExpandTransition,
  VSheet,
  VAppBar,
  VFabTransition,
  VBtn,
  VCard,
  VDivider,
  VOverlay,
} from 'vuetify/lib'

const FOOTER_HEIGHT = 48
const CARD_TITLE_HEIGHT = 64

export default defineComponent({
  components: {},
  setup(_, { slots, root, attrs }) {
    const height = ref(0)

    const top = computed(
      () => `min(calc(100vh - ${CARD_TITLE_HEIGHT}px), ${height.value}px)`,
    )

    const onMutate = (e: { height: number; width: number }) => {
      height.value = e.height
    }

    const paddingBottom = computed(() => {
      const padding = CARD_TITLE_HEIGHT - FOOTER_HEIGHT

      return height.value + padding > window.innerHeight ? padding + 'px' : null
    })

    const [active, toggleActive] = useReducer((state) => !state, false)

    return () =>
      root.$vuetify.breakpoint.xsOnly
        ? h(
            'div',
            {
              style: {
                display: 'contents',
              },
            },
            [
              h(
                VSheet,
                {
                  directives: [
                    {
                      name: 'resize',
                      value: onMutate,
                      // modifiers: {
                      //   once: true,
                      // },
                    },
                    // {
                    //   name: 'mutate',
                    //   value: ([e]) => {
                    //     height.value = e.target.scrollHeight
                    //   },
                    //   modifiers: {
                    //     once: true,
                    //   },
                    // },
                  ],
                  props: {
                    tile: true,
                    flat: true,
                    dark: true,
                    color: 'primary',
                  },
                  style: active.value
                    ? {
                        paddingBottom: paddingBottom.value,
                      }
                    : undefined,
                },
                [
                  h(
                    VAppBar,
                    {
                      props: {
                        color: 'transparent',
                        flat: true,
                      },
                    },
                    [
                      slots.backdrop
                        ? h(VFabTransition, [
                            h(
                              VBtn,
                              {
                                key: active.value.toString(),
                                props: {
                                  icon: true,
                                },
                                on: {
                                  click: toggleActive,
                                },
                              },
                              [h(VIcon, [active.value ? 'close' : 'menu'])],
                            ),
                          ])
                        : null,
                      slots.appBar({ active: active.value }),
                    ],
                  ),
                  h(VDivider, {
                    style: { marginBottom: '-2px' },
                  }),
                  h(VExpandTransition, [
                    h('KeepAlive', [
                      active.value
                        ? slots.backdrop({ active: active.value })
                        : null,
                    ]),
                  ]),
                ],
              ),
              h(
                'div',
                {
                  style: {
                    zIndex: 4,
                    flex: 1,
                    display: 'flex',
                    overflow: 'hidden',
                    height: '100%',
                    width: '100%',
                    position: active.value ? 'fixed' : null,
                    top: top.value,
                  },
                  on: {
                    click: () => {
                      if (active.value) {
                        toggleActive()
                      }
                    },
                  },
                },
                [
                  active.value
                    ? h(VOverlay, {
                        props: {
                          absolute: true,
                          opacity: '0.1',
                        },
                      })
                    : null,
                  h(VCard, { props: attrs }, [
                    slots.default({ active: active.value }),
                  ]),
                ],
              ),
            ],
          )
        : slots.default({ active: active.value })
  },
})
</script>
