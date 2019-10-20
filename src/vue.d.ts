import * as modules from '@/modules'
import { Module } from 'vuex-composition-api/dist/module'
import Vue from 'vue'

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
