<template>
  <ApolloQuery
    v-slot="{ result: { error, data, loading } }"
    :query="require('@/graphql/queries/Media.gql')"
    :variables="{
      id: command.variables.mediaId,
    }"
    :skip="!command.variables.mediaId"
    :tag="null"
  >
    <v-banner single-line>
      <span :title="getTitle(data && data.Media.title)">
        {{ getTitle(data && data.Media.title) }}
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
  </ApolloQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { DeleteCommand } from '@/store/commands/DeleteCommand'
import { FuzzyDate } from '../graphql/schema/media'
import { SaveCommand } from '@/store/commands/SaveCommand'
import { title as titleModule } from '@/store/title'

const BaseTime = () => import('./BaseTime.vue')

interface Props {
  command: SaveCommand | DeleteCommand
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseTime,
  },
  props: {
    command: {
      default: null,
      required: true,
      type: [SaveCommand, DeleteCommand],
    },
  },
  setup(props) {
    const {
      getters: { getTitle },
    } = titleModule
    const isDate = (e: any): e is Omit<FuzzyDate, '__typename'> =>
      e instanceof Object &&
      e.hasOwnProperty('month') &&
      e.hasOwnProperty('day') &&
      e.hasOwnProperty('year')

    const keys = computed(() => {
      const variables = Object.assign({}, props.command.variables)
      const backup = Object.assign({}, props.command.backup)

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
    }
  },
})
</script>
