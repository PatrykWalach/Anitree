<template>
  <v-dialog v-model="isShared" scrollable max-width="440px">
    <v-card>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :style="{ top: 0, right: 0 }"
            absolute
            icon
            small
            v-bind="attrs"
            @click="isShared = false"
            v-on="on"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <span>Close</span>
      </v-tooltip>
      <v-card-title>Share link</v-card-title>
      <v-card-text>
        <v-slide-group show-arrows>
          <base-share-item
            :href="`http://www.facebook.com/sharer.php?u=${url}`"
            color="#3B5998"
            title="Facebook"
          >
            <FontAwesomeIcon :icon="['fab', 'facebook-f']" />
          </base-share-item>
          <base-share-item
            :href="`https://twitter.com/intent/tweet?url=${url}`"
            color="#1DA1F2"
            title="Twitter"
          >
            <FontAwesomeIcon :icon="['fab', 'twitter']" />
          </base-share-item>

          <base-share-item
            color="#35465C"
            :href="`http://www.tumblr.com/share/link?url=${url}`"
            title="Tumblr"
          >
            <FontAwesomeIcon :icon="['fab', 'tumblr']" />
          </base-share-item>
          <base-share-item
            :href="`http://www.reddit.com/submit?url=${url}`"
            color="#FF4500"
            title="Reddit"
          >
            <FontAwesomeIcon :icon="['fab', 'reddit-alien']" />
          </base-share-item>
          <base-share-item :href="`mailto:?body=${url}`" title="E-mail">
            <v-icon dark>email</v-icon>
          </base-share-item>
        </v-slide-group>

        <v-snackbar v-model="snackbar" left>
          Link copied to clipboard
          <v-btn color="accent" text @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>

        <v-card flat>
          <v-list-item v-clipboard="url" @click.stop @success="snackbar = true">
            <v-list-item-content>
              <v-list-item-subtitle>
                <v-text-field
                  hide-details
                  flat
                  single-line
                  solo
                  readonly
                  :value="url"
                ></v-text-field>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn>
                copy
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faFacebookF,
  faTwitter,
  faRedditAlien,
  faTumblr
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BaseShareItem from './BaseShareItem.vue'
library.add(faFacebookF, faTwitter, faRedditAlien, faTumblr)
import { clipboard } from 'vue-clipboards'

import { ShareData } from '../types'
import { createComponent, computed, ref } from 'vue-function-api'
import useShare from '../store/share'
interface Props {
  options: ShareData | null
}
export default createComponent({
  directives: {
    clipboard
  },
  components: { FontAwesomeIcon, BaseShareItem },
  setup(props: Readonly<Props>) {
    const snackbar = ref(false)
    const { isShared } = useShare()

    const url = computed(() => (props.options && props.options.url) || '')

    return { isShared, url, snackbar }
  },
  props: {
    options: { required: true }
  }
})
</script>
