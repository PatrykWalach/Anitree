import { Module } from 'vuex-composition-api/dist/module'
import Vue from 'vue'
import * as modules from '@/store/modules'

declare module 'vue/types/vue' {
  interface Vue {
    $modules: typeof modules
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    modules?: Record<string, Module<any>>
  }
}
