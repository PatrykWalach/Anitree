<template>
  <v-dialog v-model="dialog" max-width="360px" scrollable>
    <v-card>
      <v-card-title>
        Filters
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <span class="subheading">Type</span>

            <base-field
              :value="form.type"
              :after-transform="[
                type => {
                  form = { type }
                },
              ]"
              tag="v-chip-group"
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
            </base-field>
          </v-col>

          <v-col cols="12">
            <span class="subheading">Sort</span>

            <base-field
              tag="v-chip-group"
              :value="form.sort"
              :after-transform="[
                sort => {
                  form = { sort }
                },
              ]"
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
            </base-field>
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
                e => {
                  form = { status: e }
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
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="close">cancel</v-btn>
        <v-btn :disabled="!submitRequired" text color="primary" @click="submit"
          >submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  SetupContext,
  computed,
  createComponent,
  ref,
} from '@vue/composition-api'

import BaseField from './BaseField.vue'
import { VChipGroup } from 'vuetify/lib'
import { mergeDeep } from 'apollo-utilities'

export const useDialog = (root: SetupContext['root']) => {
  const {
    state: { isShown },
    mutations: { CHANGE_IS_SHOWN },
  } = root.$modules.filter

  const dialog = computed({
    get: () => isShown.value,
    set: _value => CHANGE_IS_SHOWN(_value),
  })
  return {
    dialog,
  }
}
export const useForm = (root: SetupContext['root']) => {
  const _form = ref({})

  const form = computed({
    get: () => ({
      ...query.value,
      ..._form.value,
    }),
    set: e => {
      _form.value = mergeDeep(_form.value, e)
    },
  })
  const query = computed(() => root.$route.query)

  return { _form, form }
}

export default createComponent({
  components: {
    BaseField,
    VChipGroup,
  },
  inheritAttrs: false,
  setup(_, { root }) {
    const { dialog } = useDialog(root)
    const { _form, form } = useForm(root)

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

    const submitRequired = computed(() => !!Object.values(_form.value).length)

    return { _form, close, dialog, form, submit, submitRequired }
  },
})
</script>
