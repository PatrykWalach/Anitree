<template>
  <BaseQuery
    :apollo="{
      Media: {
        ...Media,
        tag: null,
      },
    }"
    v-slot="{ Media }"
  >
    <v-banner single-line>
      <span :title="getTitle(Media && Media.title)">
        {{ getTitle(Media && Media.title) }}
      </span>

      <template v-slot:icon>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :color="command.done ? 'primary' : 'error'"
              v-bind="attrs"
              v-on="on"
              >{{ command.done ? 'cloud_done' : 'error' }}</v-icon
            >
          </template>
          <span>{{ command.done ? 'Done' : 'Pending' }}</span>
        </v-tooltip>
      </template>
      <template v-slot:actions>
        <v-dialog max-width="440px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" text color="accent" v-on="on">
              More
            </v-btn>
          </template>
          <v-card>
            <v-simple-table>
              <thead>
                <tr>
                  <th>Changes</th>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="key in keys" :key="key">
                  <th class="text-capitalize">{{ key }}</th>
                  <td class="error--text">
                    <BaseTime
                      v-if="isDate(command.backup[key])"
                      :date="command.backup[key]"
                    />
                    <template v-else>
                      {{ command.backup[key] }}
                    </template>
                  </td>
                  <td class="success--text">
                    <BaseTime
                      v-if="isDate(command.variables[key])"
                      :date="command.variables[key]"
                    />
                    <template v-else>
                      {{ command.variables[key] }}
                    </template>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-dialog>
      </template>
    </v-banner>
  </BaseQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import BaseQuery from './BaseQuery.vue'
import { DeleteCommand } from '@/modules/commands/DeleteCommand'
import { FuzzyDate } from '../graphql/schema/media'
import { SaveCommand } from '@/modules/commands/SaveCommand'
import { useMedia } from '@/graphql'

const BaseTime = () => import('./BaseTime.vue')

interface Props {
  command: SaveCommand | DeleteCommand
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseQuery,
    BaseTime,
  },
  props: {
    command: {
      default: null,
      required: true,
      type: [SaveCommand, DeleteCommand],
    },
  },
  setup(props, { root }) {
    const {
      getters: { getTitle },
    } = root.$modules.title

    const isDate = (e: any): e is Omit<FuzzyDate, '__typename'> =>
      e instanceof Object &&
      e.hasOwnProperty('month') &&
      e.hasOwnProperty('day') &&
      e.hasOwnProperty('year')

    const keys = computed(() => {
      const {
        command: { variables: _variables, backup: _backup },
      } = props

      const variables = Object.assign({}, _variables)
      const backup = Object.assign({}, _backup)

      delete variables.id
      delete variables.mediaId

      if (!backup) {
        return Object.keys(variables).sort()
      }

      return [
        ...new Set(Object.keys(variables).concat(Object.keys(backup))),
      ].sort()
    })

    return {
      getTitle,
      isDate,
      keys,
      ...useMedia(() => ({ id: props.command.variables.mediaId })),
    }
  },
})
</script>
