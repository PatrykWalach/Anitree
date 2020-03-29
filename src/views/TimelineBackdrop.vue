<template>
  <div>
    <ViewSearchFiltersForm :form.sync="form" color="primary lighten-1" />
  </div>
</template>
<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import { Dictionary } from 'vue-router/types/router'
import { useSearchFilters } from '@/components/ViewSearchFilters.vue'

import ViewSearchFiltersForm from '@/components/ViewSearchFiltersForm.vue'

export interface Props {
  query: Dictionary<string | (string | null)[]>
}

export default defineComponent({
  components: {
    ViewSearchFiltersForm,
  },
  props: {
    query: { default: null, required: true, type: Object },
  },
  setup(props, { root, emit }) {
    const { form, submit, submitRequired } = useSearchFilters(props, root, emit)

    watch(
      form,
      () => {
        if (submitRequired.value) {
          submit()
        }
      },
      { deep: true, lazy: true },
    )

    return {
      form,
    }
  },
})
</script>
