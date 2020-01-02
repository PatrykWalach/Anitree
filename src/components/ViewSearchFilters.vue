<template>
  <v-card color="primary darken-1" dark>
    <v-card-title>
      Filters
    </v-card-title>
    <v-card-text class="pa-0">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <span class="subheading">Type</span>

            <v-chip-group
              v-model="form.type"
              column
              active-class="accent--text"
            >
              <v-chip
                v-for="type in ['ANIME', 'MANGA']"
                :key="type"
                :value="type"
                color="primary"
                class="text-capitalize"
              >
                {{ type.toLowerCase() }}
              </v-chip>
            </v-chip-group>
          </v-col>

          <v-col cols="12">
            <span class="subheading">Sort</span>

            <v-chip-group
              v-model="form.sort"
              column
              active-class="accent--text"
            >
              <v-chip
                color="primary"
                v-for="{ value, text } in [
                  {
                    value: 'ID_DESC',
                    text: 'Date Added',
                  },
                  {
                    value: 'FAVOURITES_DESC',
                    text: 'Favorites',
                  },
                  {
                    value: 'POPULARITY_DESC',
                    text: 'Popularity',
                  },
                  {
                    value: 'START_DATE_DESC',
                    text: 'Release Date',
                  },
                  {
                    value: 'SCORE_DESC',
                    text: 'Score',
                  },
                  {
                    value: 'TITLE_ROMAJI',
                    text: 'Title',
                  },
                  {
                    value: 'TRENDING_DESC',
                    text: 'Trending',
                  },
                ]"
                :key="value"
                :value="value"
                class="text-capitalize"
              >
                {{ text }}
              </v-chip>
            </v-chip-group>
          </v-col>

          <v-col cols="12">
            <span class="subheading">Status</span>
            <base-field
              v-model="form.status"
              :before-transform="[
                e => (e ? (e instanceof Array ? e : [e]) : []),
              ]"
              tag="v-chip-group"
              :after-transform="[e => (e.length ? e : undefined)]"
              multiple
              column
              active-class="accent--text"
            >
              <v-chip
                color="primary"
                v-for="status in [
                  'CANCELLED',
                  'FINISHED',
                  'NOT_YET_RELEASED',
                  'RELEASING',
                ]"
                :key="status"
                filter
                :value="status"
                class="text-capitalize"
              >
                {{
                  status
                    .toLowerCase()
                    .split(/_/)
                    .join(' ')
                }}
              </v-chip>
            </base-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-list flat subheader color="transparent">
        <v-subheader>Other</v-subheader>
        <v-list-item-group v-model="form.onList">
          <v-list-item v-slot="{ active, toggle }" value="false">
            <v-list-item-content>
              <v-list-item-title>
                Hide anime on my list
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-checkbox
                color="accent"
                :input-value="active"
                @click.stop="toggle"
              ></v-checkbox>
            </v-list-item-action>
          </v-list-item>
          <v-list-item v-slot="{ active, toggle }" value="true">
            <v-list-item-content>
              <v-list-item-title>
                Only show anime on my list
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-checkbox
                color="accent"
                :input-value="active"
                @click.stop="toggle"
              ></v-checkbox>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>

        <v-list-item-group v-model="form.isAdult">
          <v-list-item v-slot="{ active, toggle }" value="true">
            <v-list-item-content>
              <v-list-item-title>
                Adult
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-checkbox
                color="accent"
                :input-value="active"
                @click.stop="toggle"
              ></v-checkbox>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="error" @click.stop="close">cancel</v-btn>
      <v-btn
        :disabled="!submitRequired"
        text
        outlined
        color="accent"
        @click.stop="submit"
        >submit</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { computed, createComponent, ref, watch } from '@vue/composition-api'
import BaseField from './BaseField.vue'
import { Dictionary } from 'vue-router/types/router'
import { VChipGroup } from 'vuetify/lib'
import { useSubmitRequired } from '@/hooks/submitRequired'

interface Props {
  query: Dictionary<string | (string | null)[]>
}

export default createComponent({
  components: {
    BaseField,
    VChipGroup,
  },
  inheritAttrs: false,
  props: { query: { default: null, required: true, type: Object } },
  setup(props, { root, emit }) {
    const form = ref({})

    const query = computed(() => props.query)

    watch(query, ({ ...query }) => {
      form.value = query
    })

    const close = () => {
      emit('close')
    }

    const submit = () => {
      root.$router.replace({
        query: form.value,
      })
      close()
    }

    const submitRequired = useSubmitRequired(query, form)

    return {
      close,
      form,
      submit,
      submitRequired,
    }
  },
})
</script>
