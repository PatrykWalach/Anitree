<template>
  <v-dialog v-model="dialog" max-width="360px" scrollable>
    <v-card>
      <v-card-title>
        Filters
      </v-card-title>
      <v-card-text class="pa-0">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span class="subheading">Type</span>

              <v-chip-group
                :value="form.type"
                @change="
                  type => {
                    form = { type }
                  }
                "
                column
                active-class="accent--text"
              >
                <v-chip
                  v-for="type in ['ANIME', 'MANGA']"
                  :key="type"
                  :value="type"
                  class="text-capitalize"
                >
                  {{ type.toLowerCase() }}
                </v-chip>
              </v-chip-group>
            </v-col>

            <v-col cols="12">
              <span class="subheading">Sort</span>

              <v-chip-group
                :value="form.sort"
                @change="
                  sort => {
                    form = { sort }
                  }
                "
                column
                active-class="accent--text"
              >
                <v-chip
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
                :value="form.status"
                :before-transform="[
                  e => (e ? (e instanceof Array ? e : [e]) : []),
                ]"
                tag="v-chip-group"
                :after-transform="[
                  e => (e.length ? e : undefined),
                  status => {
                    form = { status }
                  },
                ]"
                multiple
                column
                active-class="accent--text"
              >
                <v-chip
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
        <v-list flat subheader>
          <v-subheader>Other</v-subheader>
          <v-list-item-group
            :value="form.onList"
            @change="
              onList => {
                form = { onList }
              }
            "
          >
            <v-list-item v-slot="{ active }" value="false">
              <v-list-item-content>
                <v-list-item-title>
                  Hide anime on my list
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="active"></v-checkbox>
              </v-list-item-action>
            </v-list-item>
            <v-list-item v-slot="{ active }" value="true">
              <v-list-item-content>
                <v-list-item-title>
                  Only show anime on my list
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="active"></v-checkbox>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>

          <v-list-item-group
            :value="form.isAdult"
            @change="
              isAdult => {
                form = { isAdult }
              }
            "
          >
            <v-list-item v-slot="{ active }" value="true">
              <v-list-item-content>
                <v-list-item-title>
                  Adult
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="active"></v-checkbox>
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
          color="primary"
          @click.stop="submit"
          >submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

import { useDialog, useForm } from '@/mixins'
import BaseField from './BaseField.vue'

import { VChipGroup } from 'vuetify/lib'

export default createComponent({
  components: {
    BaseField,
    VChipGroup,
  },
  inheritAttrs: false,
  setup(_, { root }) {
    const { dialog } = useDialog(root)
    const { _form, query, form } = useForm(root)

    const close = () => {
      dialog.value = false
      _form.value = {}
    }

    const submit = () => {
      root.$router.replace({
        query: form.value,
      })
      close()
    }

    const submitRequired = computed(() => {
      const _query = query.value

      for (const [key, value] of Object.entries(_form.value)) {
        if (_query[key] !== value) {
          return true
        }
      }
      return false
    })

    return {
      _form,
      close,
      dialog,
      form,
      submit,
      submitRequired,
    }
  },
})
</script>
