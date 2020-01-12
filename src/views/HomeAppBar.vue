<template>
  <div :style="{ flex: 1, display: 'flex', justifyContent: 'flex-end' }">
    <VDialog>
      <template v-slot:activator="{ on, attrs }">
        <VBtn icon v-on="on" v-bind="attrs">
          <VAvatar size="40">
            <VSkeletonLoader v-if="loading" type="avatar" />
            <VImg v-else-if="viewer" :src="viewer.avatar.large">
              <template v-slot:placeholder>
                <VSkeletonLoader type="image" />
              </template>
            </VImg>
            <VIcon v-else>person</VIcon>
          </VAvatar>
        </VBtn>
      </template>

      <VCard v-if="viewer" color="primary" dark>
        <VListItem>
          <VListItemAvatar size="48">
            <VImg :src="viewer.avatar.large">
              <template v-slot:placeholder>
                <VSkeletonLoader type="image" />
              </template>
            </VImg>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle v-text="viewer.name" />
            <VListItemSubtitle v-text="viewer.siteUrl" />
          </VListItemContent>
        </VListItem>
        <VListItem>
          <VListItemContent>
            <VBtn block outlined color="accent" rounded
              >view
              <VIcon small right color="accent">open_in_new</VIcon>
            </VBtn>
          </VListItemContent>
        </VListItem>

        <VDivider />
        <v-list color="transparent">
          <VListItem rel="noopener" :href="`${viewer.siteUrl}/animelist`">
            <VListItemIcon>
              <VIcon>movie</VIcon>
            </VListItemIcon>
            <VListItemContent>
              <VListItemTitle>
                Anime List
              </VListItemTitle>
            </VListItemContent>
          </VListItem>

          <VListItem rel="noopener" :href="`${viewer.siteUrl}/mangalist`">
            <VListItemIcon>
              <VIcon>menu_book</VIcon>
            </VListItemIcon>
            <VListItemContent>
              <VListItemTitle>
                Manga List
              </VListItemTitle>
            </VListItemContent>
          </VListItem>
        </v-list>
        <VDivider />

        <VListItem>
          <VListItemContent>
            <VBtn block outlined text rounded @click.stop="logout">logout</VBtn>
          </VListItemContent>
        </VListItem>
      </VCard>
      <VCard v-else-if="!token" color="primary" dark>
        <VCardTitle>
          Please login
        </VCardTitle>
        <VCardActions>
          <VBtn
            :href="
              `https://anilist.co/api/v2/oauth/authorize?client_id=${id}&response_type=token`
            "
            block
            color="accent"
            >login</VBtn
          >
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
<script lang="ts">
import BaseAction from '@/components/BaseAction.vue'
import { createComponent } from '@vue/composition-api'
import { useTheDrawerNavigation } from '@/components/TheDrawer.vue'
import { useToken } from '@/hooks/token'
import { useResult, useQuery } from '@vue/apollo-composable'
import { HomeAppBarQuery } from './HomeAppBar.gql.js'
import { settingsActions } from '@/store/reducers/settings'
import { useDispatch } from 'vue-redux-hooks'
import { useLogin } from '../components/TheDrawerLogin.vue'

export default createComponent({
  components: { BaseAction },
  setup() {
    const navigationElements = useTheDrawerNavigation()

    const token = useToken()

    const { loading, result } = useQuery(HomeAppBarQuery, {}, () => ({
      enabled: !!token.value,
    }))

    const viewer = useResult(result)

    const dispatch = useDispatch()

    const logout = () => {
      dispatch(settingsActions.CHANGE_TOKEN(null))
    }

    const { id } = useLogin()

    return { id, viewer, logout, token, loading, navigationElements }
  },
})
</script>
