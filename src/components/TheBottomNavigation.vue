<template>
  <v-bottom-navigation app :value="value" color="primary">
    <v-btn exact :key="title" :to="to" v-for="{ to, icon, title } in elements">
      <span>{{ title }}</span>
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import {
  createComponent,
  computed
  // createElement as h
} from '@vue/composition-api'
// import NavigationDirector from './NavigationDirector'
// import NavigationBuilder from './NavigationBuilder'

// import { VBottomNavigation } from 'vuetify/lib'
import useNavigation from '@/store/navigation'

export default createComponent({
  setup(_, { root }) {
    const value = computed(() => root.$route.name)

    // const director = new NavigationDirector()
    const { elements } = useNavigation()
    return {
      value,
      elements
    }

    // return () => {
    //   const builder = new NavigationBuilder()

    //   director.bottomNavigation(builder)

    //   return h(
    //     VBottomNavigation,
    //     {
    //       props: {
    //         app: true,
    //         value: value.value,
    //         color: 'primary'
    //       }
    //     },
    //     builder.getItems()
    //   )
    // }
  }
})
</script>
