<template>
  <ApolloQuery
    v-slot="{ result: { error, data, loading } }"
    :query="require('@/graphql/queries/Media.gql')"
    :variables="{
      id: command.variables.mediaId
    }"
    :skip="!command.variables.mediaId"
    :tag="null"
  >
    <v-banner single-line>
      <span :title="title(data && data.Media.title)">
        {{ title(data && data.Media.title) }}
      </span>

      <template v-slot:icon>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :color="command.done ? 'primary' : 'error'"
              v-on="on"
              v-bind="attrs"
              >{{ command.done ? 'cloud_done' : 'error' }}</v-icon
            >
          </template>
          <span>{{ command.done ? 'Done' : 'Pending' }}</span>
        </v-tooltip>
      </template>
      <template v-slot:actions>
        <v-dialog max-width="440px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text color="accent">
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
                <tr :key="key" v-for="key in keys">
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
import { SaveCommand, DeleteCommand } from '@/store/mutations'
import useTitle from '@/store/title'
import { createComponent, computed } from '@vue/composition-api'
import { FuzzyDate } from '../graphql/schema/media'

const BaseTime = () => import('./BaseTime.vue')

interface Props {
  command: SaveCommand | DeleteCommand
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseTime
  },
  props: {
    command: {
      required: true,
      type: [SaveCommand, DeleteCommand],
      default: null
    }
  },
  setup(props) {
    const { title } = useTitle()
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
        ...new Set(Object.keys(variables).concat(Object.keys(backup)))
      ].sort()
    })

    return {
      title,
      keys,
      isDate
    }
  }
})
</script>
