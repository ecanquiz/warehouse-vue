import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileUpdatePassword from '../Index.vue'
import AppButton from '@/core/components/AppButton.vue'
import AppFlashMessage from '@/core/components/AppFlashMessage.vue'
import type { VueWrapper } from '@vue/test-utils'
import type {UpdatePassword} from '@/modules/Auth/types/Auth'

describe('ModuleAuthComponentProfileUpdatePassword.vue',  () => {

  type Wrapper = VueWrapper<Partial<{
    updatePassword: (user: UpdatePassword) => void
  }>> // Or put "defineExpose({ updatePassword })" in components

  it('should be called updatePassword with payload', async () => {
    const wrapper: Wrapper = mount(ProfileUpdatePassword, {
      global: {
        components: {
          AppButton,
          AppFlashMessage
        }
      }    
    })
    const updatePasswordSpy = vi.spyOn(wrapper.vm, 'updatePassword');
    const payload = {
      current_password: 'current-password',
      password: 'password',
      password_confirmation: 'password-confirm'
    }

    wrapper.vm.updatePassword(payload)

    expect(updatePasswordSpy).toHaveBeenCalled()
    expect(updatePasswordSpy).toHaveBeenCalledTimes(1)
    expect(updatePasswordSpy).toHaveBeenCalledWith(payload)
  })  
})
