<template>
  <VCard color="primary darken-1" dark>
    <VCardTitle>
      Filters
    </VCardTitle>
    <ViewSearchFiltersForm :form.sync="form" />
    <VDivider />
    <VCardActions>
      <VSpacer />
      <VBtn text color="error" @click.stop="close">
        cancel
      </VBtn>
      <VBtn
        :disabled="!submitRequired"
        text
        outlined
        color="accent"
        @click.stop="submit"
      >
        submit
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script lang="ts">
import {
  computed,
  SetupContext,
  createComponent,
  ref,
  watch,
} from '@vue/composition-api'
import ViewSearchFiltersForm from './ViewSearchFiltersForm.vue'
import { Dictionary } from 'vue-router/types/router'
import { useSubmitRequired } from '@/hooks/submitRequired'

interface Props {
  query: Dictionary<string | (string | null)[]>
}

export const useSearchFilters = (
  props: Readonly<Props>,
  root: SetupContext['root'],
  emit: SetupContext['emit'],
) => {
  const form = ref({})

  const query = computed(() => props.query)

  watch(query, ({ ...query }) => {
    form.value = query
  })

  const close = () => {
    emit('close')
  }

  const submit = () => {
    root.$router.replace({
      query: form.value,
    })
    close()
  }

  const submitRequired = useSubmitRequired(query, form)
  return {
    close,
    form,
    submit,
    submitRequired,
  }
}

export default createComponent({
  components: {
    ViewSearchFiltersForm,
  },
  inheritAttrs: false,
  props: { query: { default: null, required: true, type: Object } },
  setup(props, { root, emit }) {
    return useSearchFilters(props, root, emit)
  },
})
</script>
