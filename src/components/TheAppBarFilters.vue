<template>
  <v-dialog max-width="720px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-on="on" v-bind="attrs">
        <v-icon>tune</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        Filters
      </v-card-title>
      <v-divider></v-divider>
      <TheAppBarFiltersList :form.sync="form" />
      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn text color="error" @click="close">cancel</v-btn>
        <v-btn text color="primary" @click="submit" :disabled="!submitRequired"
          >submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { createComponent, ref, computed } from '@vue/composition-api'
import TheAppBarFiltersList from './TheAppBarFiltersList.vue'

export default createComponent<{}>({
  components: {
    TheAppBarFiltersList
  },
  setup(_, { root }) {
    const form = ref({})
    const dialog = ref(false)

    const close = () => {
      form.value = {}
      dialog.value = false
    }

    const submit = () => {
      root.$router.replace({
        query: {
          ...root.$route.query,
          ...form.value
        }
      })
      close()
    }

    const submitRequired = computed(() => !!Object.values(form.value).length)

    return { form, submit, dialog, submitRequired, close }
  }
})
</script>
