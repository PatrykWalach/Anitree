<template>
  <base-container>
    <v-flex>
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <home-item left>
          <template v-slot:title>
            This app is under construction
          </template>
          Please visit
          <router-link to="/roadmap"> roadmap </router-link>for more information
        </home-item>

        <home-item left>
          <template v-slot:opposite>
            <ApolloQuery
              :query="require('@/apollo/queries/Media.gql')"
              :variables="{ id: 21450 }"
              fetch-policy="cache-and-network"
              :tag="null"
            >
              <MediaCard :id="21450" />
            </ApolloQuery>
          </template>
          <template v-slot:title>
            Media Cards
          </template>
          Media cards display media title, type, status, related tags, main
          studios and list status if user is logged in.
          <br />More data may be shown in future: relation type and the
          description
        </home-item>
        <!-- <home-item left>
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
              href="https://anilist.co"
              target="_blank"
              rel="noopener"
            >
              Anilist
              <v-icon>open_in_new</icon>
            </a>
          </p>
        </home-item>-->
        <home-item left>
          <template v-slot:opposite>
            <TheSettings />
          </template>
          <template v-slot:title>
            Settings
          </template>
          The settings are stored in the browser cache.
        </home-item>
      </v-timeline>
    </v-flex>
  </base-container>
</template>

<script lang="ts">
import BaseContainer from '@/components/BaseContainer.vue'
import MediaCard from '@/components/MediaCard.vue'
import HomeItem from '@/components/HomeItem.vue'
import TheSettings from '@/components/TheSettings.vue'

export default {
  components: {
    BaseContainer,
    MediaCard,
    HomeItem,
    TheSettings
  }
}
</script>
