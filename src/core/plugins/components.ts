import { defineAsyncComponent } from 'vue'
import app from '@/core/plugins/app'

app
  .component('DefaultLayout', defineAsyncComponent(() => import('@/core/layouts/DashboardLayout.vue')))
  .component('EmptyLayout', defineAsyncComponent(() => import('@/core/layouts/EmptyLayout.vue')));

const componentApps = import.meta.glob('@/core/components/App*.vue', {
  eager: false,
  import: 'default'
})

Object.keys(componentApps).forEach(path => {
  const componentName = path.split('/').pop()?.replace('.vue', ''); 
  if (componentName) {
    app.component(componentName, defineAsyncComponent(() => componentApps[path]()));  
  }
});
