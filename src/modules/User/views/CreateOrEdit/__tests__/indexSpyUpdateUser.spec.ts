import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import CreateOrEdit from '../Index.vue'
import {
  AppButton,
  AppInput,
  AppErrorMessage,
  AppFlashMessage,
  AppSelect,
  AppPageHeader
} from '@/modules/__tests__/globalComponents'
import router from '@/core/router'
import type { VueWrapper } from '@vue/test-utils'
import type User from '../../../types/User'

describe('Modules User views CreateOrUpdate Component',  () => {
  
  it('should be called submit with payload', async () => {
    
    type Wrapper = VueWrapper<Partial<{
      submit: (user: User, id: string) => void
    }>> // Or put "defineExpose({ submit })" in components
  
    const user = {
      name: "John Doe",
      email: "user@email.ext",
      password: "password",
      role_id: "1"
    }
  
    const wrapper: Wrapper = mount(CreateOrEdit, {
      props: {
        id: "1"
      },
      mounted: vi.fn(),
      global: {
        plugins: [router, createTestingPinia({})],
        components: {
          AppButton,
          AppInput,
          AppErrorMessage,
          AppFlashMessage,
          AppSelect,
          AppPageHeader
        }
      }
    })

    const submitSpy = vi.spyOn(wrapper.vm, 'submit');
    wrapper.vm.submit(user, "1")

    expect(submitSpy).toHaveBeenCalled()
    expect(submitSpy).toHaveBeenCalledTimes(1)
    expect(submitSpy).toHaveBeenCalledWith(user, "1")
  })
    
})
