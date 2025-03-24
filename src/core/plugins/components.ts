import { defineAsyncComponent } from 'vue'
import app from '@/core/plugins/app'

app
  .component('AppBtn', defineAsyncComponent(() => import('@/core/components/AppBtn.vue')))
  .component('AppCheckbox', defineAsyncComponent(() => import('@/core/components/AppCheckbox.vue')))
  .component('AppErrorMessage', defineAsyncComponent(() => import('@/core/components/AppErrorMessage.vue')))
  .component('AppFlashMessage', defineAsyncComponent(() => import('@/core/components/AppFlashMessage.vue')))
  .component('AppLink', defineAsyncComponent(() => import('@/core/components/AppLink.vue')))   
  .component('AppInput', defineAsyncComponent(() => import('@/core/components/AppInput.vue')))
  .component('AppSectionBorder', defineAsyncComponent(() => import('@/core/components/AppSectionBorder.vue')))
  .component('AppSectionInfo', defineAsyncComponent(() => import('@/core/components/AppSectionInfo.vue')))
  .component('AppSelect', defineAsyncComponent(() => import('@/core/components/AppSelect.vue')))
  .component('AppPageHeader', defineAsyncComponent(() => import('@/core/components/AppPageHeader.vue')))
  .component('AppPaginationA', defineAsyncComponent(() => import('@/core/components/AppPaginationA.vue')))
  .component('AppPaginationB', defineAsyncComponent(() => import('@/core/components/AppPaginationB.vue')))
  .component('AppPaginationC', defineAsyncComponent(() => import('@/core/components/AppPaginationC.vue')))
  .component('AppPaginationD', defineAsyncComponent(() => import('@/core/components/AppPaginationD.vue')))
  .component('AppTextarea', defineAsyncComponent(() => import('@/core/components/AppTextarea.vue')))
  .component('AppPending', defineAsyncComponent(() => import('@/core/components/AppPending.vue')))
  .component('AppRadio', defineAsyncComponent(() => import('@/core/components/AppRadio.vue')))
  .component('AppRadioGroup', defineAsyncComponent(() => import('@/core/components/AppRadioGroup.vue')))
  .component('DefaultLayout', defineAsyncComponent(() => import('@/core/layouts/DashboardLayout.vue')))
  .component('EmptyLayout', defineAsyncComponent(() => import('@/core/layouts/EmptyLayout.vue')))

