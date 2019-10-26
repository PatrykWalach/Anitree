<template>
  <v-container pa-0>
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="6">
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="value"
            full-width
            single-line
            filled
            rounded
            hide-details
            name="search"
            label="Search"
            @click="move"
          >
            <template v-slot:append>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    @click="submit"
                    v-on="on"
                    v-bind="attrs"
                  >
                    search
                  </v-icon>
                </template>
                <span>Search</span>
              </v-tooltip>
            </template>
            <template v-slot:prepend-inner>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon @click="$router.back()" v-on="on" v-bind="attrs"
                    >arrow_back</v-icon
                  >
                </template>
                <span>Back</span>
              </v-tooltip>
            </template>
          </v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'

export default createComponent({
  setup(_, { root }) {
    const value = ref('')

    watch(
      () => root.$route.query.search,
      (search = '') => {
        if (search && !(search instanceof Array)) {
          value.value = search
        }
      },
    )

    // const clear = () =>
    //   root.$router.replace({
    //     name: 'search',
    //     query: {},
    //   })

    const move = () => {
      if (!value.value && root.$route.name !== 'search') {
        root.$router.push({
          name: 'search',
          query: {},
        })
      }
    }

    const submit = () => {
      const _value = value.value

      if (_value !== root.$route.query.search)
        root.$router.push({
          name: 'search',
          query: { search: _value },
        })
    }

    return {
      // clear,
      move,
      submit,
      value,
    }
  },
})
</script>
