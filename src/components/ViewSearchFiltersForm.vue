<template>
  <div>
    <VDivider></VDivider>
    <VList flat subheader color="transparent">
      <v-subheader>Type</v-subheader>
      <VListItem>
        <v-chip-group
          v-model="syncedForm.type"
          column
          :active-class="activeClass"
        >
          <v-chip
            :color="color"
            v-for="type in ['ANIME', 'MANGA']"
            :key="type"
            :value="type"
            class="text-capitalize"
          >
            {{ type.toLowerCase() }}
          </v-chip>
        </v-chip-group>
      </VListItem>

      <VDivider></VDivider>

      <v-subheader>Sort</v-subheader>

      <VListItem>
        <v-chip-group
          v-model="syncedForm.sort"
          column
          :active-class="activeClass"
        >
          <v-chip
            :color="color"
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
      </VListItem>

      <VDivider></VDivider>

      <v-subheader>Status</v-subheader>
      <VListItem>
        <base-field
          v-model="syncedForm.status"
          :before-transform="[e => (e ? (e instanceof Array ? e : [e]) : [])]"
          tag="v-chip-group"
          :after-transform="[e => (e.length ? e : undefined)]"
          multiple
          column
          :active-class="activeClass"
        >
          <v-chip
            v-for="status in [
              'CANCELLED',
              'FINISHED',
              'NOT_YET_RELEASED',
              'RELEASING',
            ]"
            :key="status"
            :color="color"
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
      </VListItem>
    </VList>
    <VDivider></VDivider>
    <VList flat subheader color="transparent">
      <v-subheader>Other</v-subheader>
      <v-list-item-group v-model="syncedForm.onList">
        <VListItem v-slot="{ active, toggle }" value="false">
          <VListItemContent>
            <VListItemTitle>
              Hide anime on my list
            </VListItemTitle>
          </VListItemContent>
          <VListItemAction>
            <v-checkbox
              :color="activeClass"
              :input-value="active"
              @click.stop="toggle"
            />
          </VListItemAction>
        </VListItem>
        <VListItem v-slot="{ active, toggle }" value="true">
          <VListItemContent>
            <VListItemTitle>
              Only show anime on my list
            </VListItemTitle>
          </VListItemContent>
          <VListItemAction>
            <v-checkbox
              :color="activeClass"
              :input-value="active"
              @click.stop="toggle"
            />
          </VListItemAction>
        </VListItem>
      </v-list-item-group>

      <v-list-item-group v-model="syncedForm.isAdult">
        <VListItem v-slot="{ active, toggle }" value="true">
          <VListItemContent>
            <VListItemTitle>
              Adult
            </VListItemTitle>
          </VListItemContent>
          <VListItemAction>
            <v-checkbox
              :color="activeClass"
              :input-value="active"
              @click.stop="toggle"
            />
          </VListItemAction>
        </VListItem>
      </v-list-item-group>
    </VList>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import BaseField from './BaseField.vue'
import { VChipGroup } from 'vuetify/lib'
import { useSync } from '@/hooks/sync'

export default createComponent({
  components: {
    BaseField,
    VChipGroup,
  },
  inheritAttrs: false,
  props: {
    form: { default: null, required: true, type: Object },
    activeClass: {
      default: null,
      required: false,
      type: null,
    },
    color: { default: 'primary', required: false, type: String },
  },
  setup(props, { emit }) {
    const syncedForm = useSync(props, 'form', emit)
    return { syncedForm }
  },
})
</script>
