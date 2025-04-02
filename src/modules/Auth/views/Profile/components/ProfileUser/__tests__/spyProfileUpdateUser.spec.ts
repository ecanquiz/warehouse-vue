import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ProfileUser from '../Index.vue'
import { AppButton, AppInput, AppErrorMessage, AppFlashMessage, AppSelect } from '@/modules/__tests__/globalComponents'
import type { VueWrapper } from '@vue/test-utils'
import type { UpdateUser } from '@/modules/Auth/types/Auth'

const payload = {
  name: "John Doe",
  email: "user@email.ext"
}

describe('ModuleAuthComponentProfileUser.vue',  () => {

  type Wrapper = VueWrapper<Partial<{
    updateUser: (user: UpdateUser) => void
  }>> // Or put "defineExpose({ updateUser })" in components

  it('should be called updateUser with payload', async () => {
    const wrapper: Wrapper = mount(ProfileUser, {
      global: {
        components: {
          AppButton,
          AppInput,
          AppErrorMessage,
          AppFlashMessage,
          AppSelect
        },
        plugins: [createTestingPinia({
          initialState: {
            auth: { user: payload }, 
          }
        })]
      }
    })
    const updateUserSpy = vi.spyOn(wrapper.vm, 'updateUser');

    wrapper.vm.updateUser(payload)

    expect(updateUserSpy).toHaveBeenCalled()
    expect(updateUserSpy).toHaveBeenCalledTimes(1)
    expect(updateUserSpy).toHaveBeenCalledWith(payload)
  })  
})
