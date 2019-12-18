<template>
  <v-dialog
    v-model="isEdited"
    scrollable
    :fullscreen="$vuetify.breakpoint.xsOnly"
    max-width="720px"
  >
    <MediaEditLoadingDialog v-if="queryLoading" />
    <MediaEditDialog
      v-else-if="media && viewer"
      :viewer="viewer"
      :media="media"
    />
  </v-dialog>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { useDispatch, useSelector } from 'vue-redux-hooks'
import { useMedia, useViewer } from '@/graphql'
import { useQueryLoading, useResult } from '@vue/apollo-composable'
import MediaEditLoadingDialog from './MediaEditLoadingDialog.vue'
import { State } from '@/store'
import { User } from '../graphql/schema/viewer'
import { asyncComponent } from '@/views/Search.vue'
import { useActions } from '../store'

const MediaEditDialog = () =>
  asyncComponent(
    import(/* webpackChunkName: "MediaEditDialog" */ './MediaEditDialog.vue'),
    MediaEditLoadingDialog,
  )

export interface Props {
  id: number | null
  viewer: User | null
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaEditDialog,
    MediaEditLoadingDialog,
  },
  props: {
    id: { default: null, required: true, type: null },
    viewer: { default: null, required: true, type: null },
  },
  setup(props) {
    const dispatch = useDispatch()

    const {
      edit: { CHANGE_IS_EDITED },
    } = useActions()

    const isEditedState = useSelector((state: State) => state.edit.isEdited)

    const isEdited = computed({
      get: () => isEditedState.value,
      set: isEdited => {
        if (!isEdited) {
          close()
        } else {
          dispatch(CHANGE_IS_EDITED(isEdited))
        }
      },
    })

    const { result } = useViewer()

    const format = useResult(
      result,
      undefined,
      data => data.Viewer.mediaListOptions.scoreFormat,
    )

    const variables = computed(() => ({
      format: format.value,
      id: props.id || 0,
    }))

    const queryLoading = useQueryLoading()

    const { Media: media } = useMedia(variables)

    return {
      isEdited,
      media,
      queryLoading,
    }
  },
})
</script>
