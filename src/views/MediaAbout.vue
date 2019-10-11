<template>
  <ApolloQuery
    v-slot="{ result: { error, data }, isLoading, query }"
    :query="require('@/graphql/queries/Media.gql')"
    :variables="variables"
    :skip="!mediaId"
    :tag="null"
  >
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card-text v-html="data && data.Media.description"></v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <TheMediaStats
            v-if="data"
            subheader="Score Distribution"
            :gradient="['#f72047', '#ffd200', '#1feaea']"
            labelKey="score"
            :distribution="data.Media.stats.scoreDistribution"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TheMediaStats
            v-if="data"
            subheader="Status Distribution"
            :gradient="['#68d639', '#02a9ff', '#9256f3', '#f779a4', '#e85d75']"
            :distribution="data.Media.stats.statusDistribution"
            labelKey="status"
            sort
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-subheader>Tags</v-subheader>
          <TheMediaTags v-if="data" :media="data && data.Media" />
        </v-col>
      </v-row>
    </v-container>
  </ApolloQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import TheMediaStats from '@/components/TheMediaStats.vue'

import TheMediaTags from '@/components/TheMediaTags.vue'
import { title } from '@/store/title'

export default createComponent({
  components: {
    TheMediaStats,
    TheMediaTags,
  },
  setup(_, { root }) {
    const mediaId = computed(() => parseInt(root.$route.params.mediaId, 10))
    const variables = computed(() => ({ id: mediaId.value }))

    const {
      getters: { getTitle },
    } = title

    return {
      getTitle,
      mediaId,
      variables,
    }
  },
})
</script>
