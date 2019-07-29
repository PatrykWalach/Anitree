<template>
  <v-dialog v-model="isShared" scrollable max-width="440px">
    <template v-slot:activator="{ on }">
      <slot v-bind="{ on }"></slot>
    </template>

    <v-card>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            :style="{ top: 0, right: 0 }"
            absolute
            icon
            small
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

        <v-card flat>
          <v-list-item v-clipboard="url" @click>
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
import { Vue, Component, Prop } from 'vue-property-decorator'
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
import share from '../store/modules/share'
import { ShareData } from '../types'

@Component({
  directives: {
    clipboard
  },
  components: { FontAwesomeIcon, BaseShareItem }
})
export default class BaseShare extends Vue {
  get isShared() {
    return share.isShared
  }

  set isShared(value) {
    share.CHANGE_IS_SHARED(value)
  }

  get url() {
    const { options } = this
    return (options && options.url) || ''
  }

  @Prop({ required: true })
  readonly options!: ShareData | null
}
</script>
