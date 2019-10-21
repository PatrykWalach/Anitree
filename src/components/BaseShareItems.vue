<script lang="tsx">
import {
  VCardText,
  VCol,
  VContainer,
  VIcon,
  VRow,
  VSlideGroup,
  VSlideItem,
} from 'vuetify/lib'
import { computed, createComponent, createElement } from '@vue/composition-api'
import {
  faFacebookF,
  faRedditAlien,
  faTumblr,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import BaseShareItem from './BaseShareItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faFacebookF, faTwitter, faRedditAlien, faTumblr)
export interface Props {
  url: string
}
export default createComponent<Readonly<Props>>({
  components: {
    BaseShareItem,
    FontAwesomeIcon,
    VCardText,
    VCol,
    VContainer,
    VIcon,
    VRow,
    VSlideGroup,
    VSlideItem,
  },
  props: {
    url: { default: '', required: true, type: String },
  },
  setup: (props, { root }) => {
    const h = createElement

    const items = computed(() => {
      const { url } = props

      return [
        {
          color: '#3B5998',
          href: `http://www.facebook.com/sharer.php?u=${url}`,
          icon: (
            <font-awesome-icon icon={['fab', 'facebook-f']}></font-awesome-icon>
          ),
          title: 'Facebook',
        },
        {
          color: '#1DA1F2',
          href: `https://twitter.com/intent/tweet?url=${url}`,
          icon: (
            <font-awesome-icon icon={['fab', 'twitter']}></font-awesome-icon>
          ),
          title: 'Twitter',
        },
        {
          color: '#35465C',
          href: `http://www.tumblr.com/share/link?url=${url}`,
          icon: (
            <font-awesome-icon icon={['fab', 'tumblr']}></font-awesome-icon>
          ),
          title: 'Tumblr',
        },
        {
          color: '#FF4500',
          href: `http://www.reddit.com/submit?url=${url}`,
          icon: (
            <font-awesome-icon
              icon={['fab', 'reddit-alien']}
            ></font-awesome-icon>
          ),
          title: 'Reddit',
        },
        {
          href: `mailto:?body=${url}`,
          icon: <v-icon dark>email</v-icon>,
          title: 'E-mail',
        },
      ]
    })

    return () =>
      root.$vuetify.breakpoint.xsOnly ? (
        <v-container>
          <v-row no-gutters>
            {items.value.map(({ href, color, title, icon }) => (
              <v-col cols="3" key={title}>
                <base-share-item href={href} color={color} title={title}>
                  {icon}
                </base-share-item>
              </v-col>
            ))}
          </v-row>
        </v-container>
      ) : (
        <v-card-text>
          <v-slide-group show-arrows>
            {items.value.map(({ href, color, title, icon }) => (
              <v-slide-item>
                <base-share-item href={href} color={color} title={title}>
                  {icon}
                </base-share-item>
              </v-slide-item>
            ))}
          </v-slide-group>
        </v-card-text>
      )
  },
})
</script>
