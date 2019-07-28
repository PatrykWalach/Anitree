<template>
  <base-container>
    <v-flex>
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <home-item left>
          <template v-slot:title>
            This app is under construction
          </template>
          Please visit
          <router-link class="link primary--text" to="/roadmap">
            roadmap
          </router-link>
          for more information
        </home-item>

        <home-item left>
          <template v-slot:opposite>
            <MediaCard v-if="random" :media="random" />
          </template>
          <template v-slot:title>
            Media Cards
          </template>
          Media cards display media title, type, status, related tags, main
          studios and list status if user is logged in.
          <br />
          More data may be shown in future: relation type and the description
        </home-item>
        <home-item left>
          <template v-slot:opposite>
            <v-card>
              <TheDrawerFilters :filters="filters" />
            </v-card>
          </template>
          <template v-slot:title>
            Filters
          </template>

          <p>Filters can hide unwanted media.</p>

          <p>
            There are two different modes <strong>inclusive</strong> and
            <strong>excluisve</strong>.
          </p>

          <div class="subheading">The Latter Mode</div>
          <p>
            In the latter mode closest related media of given type as well as
            all media related to this media are hidden.
          </p>
          <div class="subheading">The Former Mode</div>
          <p>
            In the former mode closest related media of given type is shown all
            media related to this media is hidden
          </p>

          <p>
            If <strong>all</strong> filters are enabled and inclusive, only the
            directly related media is shown, it is the same way related media is
            shown on
            <a
              class="link primary--text"
              href="https://anilist.co"
              target="_blank"
              rel="noopener"
            >
              Anilist
            </a>
          </p>
        </home-item>
        <home-item left>
          <template v-slot:opposite>
            <v-card>
              <TheDrawerSettings />
            </v-card>
          </template>
          <template v-slot:title>
            Settings
          </template>
          The settings are stored in browser cache.
        </home-item>
      </v-timeline>
    </v-flex>
  </base-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TheDrawerFilters from '@/components/TheDrawerFilters.vue'
import TheDrawerSettings from '@/components/TheDrawerSettings.vue'
import BaseContainer from '@/components/BaseContainer.vue'
import MediaCard from '@/components/MediaCard.vue'
import HomeItem from '@/components/HomeItem.vue'
import media from '../store/modules/media'

@Component({
  components: {
    TheDrawerFilters,
    TheDrawerSettings,
    BaseContainer,
    MediaCard,
    HomeItem
  }
})
export default class Home extends Vue {
  filters = ['CHARACTER']
  loading: boolean = false

  async created() {
    this.loading = true
    await media.fetchMedia({ sort: 'POPULARITY_DESC' })
    this.loading = false
  }

  get media() {
    return media.media
  }

  get random() {
    if (!this.loading) {
      const media = Object.values(this.media)
      return media[Math.floor(Math.random() * media.length)]
    }
    return null
  }
}
</script>
