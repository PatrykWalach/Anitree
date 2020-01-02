import { Ref, computed } from '@vue/composition-api'

export const useSubmitRequired = (
  query: Ref<Record<string, any>>,
  form: Ref<Record<string, any>>,
) =>
  computed(() => {
    const queryValue = query.value

    for (const [key, value] of Object.entries(form.value)) {
      if (queryValue[key] !== value) {
        return true
      }
    }
    return false
  })
