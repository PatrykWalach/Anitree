<template>
  <!-- <base-container :loading="loading"> -->
  <!-- <MediaTimeline :media-list="mediaList" /> -->
  <!-- </base-container> -->
  <v-container>
    <v-subheader>
      <template v-if="!elements.length">
        No changes made recently
      </template>
      <template v-else>
        Recent changes:
        <v-spacer></v-spacer>
        <v-btn @click="elements.pop().undo()">Undo</v-btn>
      </template>
    </v-subheader>

    <v-row>
      <v-col
        cols="12"
        md="4"
        v-for="element in elements.slice().reverse()"
        :key="element.id"
      >
        <v-card>
          <ApolloQuery
            v-slot="{ result: { error, data, loading } }"
            :query="require('@/graphql/queries/Media.gql')"
            :variables="{
              id: element.mediaId
            }"
            :skip="!element.mediaId"
            :tag="null"
          >
            <v-card-title>
              {{ title(data && data.Media.title) }}
            </v-card-title>
          </ApolloQuery>

          <v-list>
            <v-list-item
              :key="variable"
              v-for="[variable, value] in Object.entries(element.variables)"
            >
              <v-list-item-content>
                <v-list-item-title class="text-capitalize">
                  {{ variable }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span class="error--text">
                    {{ element.backup[variable] || '_' }}
                  </span>
                  =>
                  <span class="success--text">
                    {{ value }}
                  </span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn v-if="element.done" text @click="element.undo()">Undo</v-btn>
            <v-btn v-else text @click="element.execute()">Commit</v-btn>
            <v-spacer></v-spacer>
            <v-chip :color="element.done ? 'success' : 'error'"
              >Change{{ element.done ? ' ' : ' Not ' }}Commited</v-chip
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import useMutations from '@/store/mutations'
import useTitle from '@/store/title'
import { createComponent } from '@vue/composition-api'
import MediaCardItem from '@/components/MediaCardItem.vue'

export default createComponent({
  components: { MediaCardItem },
  setup() {
    const { elements } = useMutations()
    const { title } = useTitle()

    return {
      elements,
      title
    }
  }
})
</script>
