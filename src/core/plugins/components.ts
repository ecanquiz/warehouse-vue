import { defineAsyncComponent } from 'vue'
import components from '@ecanquiz/vue-core-components'
import app from '@/core/plugins/app'
import type { Component } from 'vue'

app
  .component('DefaultLayout', defineAsyncComponent(() => import('@/core/layouts/DashboardLayout.vue')))
  .component('EmptyLayout', defineAsyncComponent(() => import('@/core/layouts/EmptyLayout.vue')));

Object.keys(components).forEach((component: string) => {
  app.component(`App${component}`,  defineAsyncComponent(components[component as keyof Component]) );
});
