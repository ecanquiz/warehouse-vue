import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormUpdatePassword from '../FormUpdatePassword.vue'
import AppButton from '@/core/components/AppButton.vue'
import AppFlashMessage from '@/core/components/AppFlashMessage.vue'
import type { UpdatePassword } from '@/modules/Auth/types/Auth'

describe('ModuleAuthComponentFormUpdatePassword.vue',  () => {
  it('emits the input to its parent', async () => {
    const wrapper = mount(FormUpdatePassword, {
      global: {
        components: {
          AppButton,
          AppFlashMessage
        }
      },
      props: {
        message: "",
        error: "",
        sending: true
      }
    })
    
    wrapper.get('[data-testid="current-password-input"]').setValue('current-password')
    wrapper.get('[data-testid="password-input"]').setValue('password')
    wrapper.get('[data-testid="password-confirm-input"]').setValue('password-confirm')

    await wrapper.trigger('submit.prevent')

    const submitEvent = wrapper.emitted('submit')

    expect(submitEvent).toBeTruthy()
    expect((submitEvent[0][0] as UpdatePassword).current_password).toBe('current-password')
    expect((submitEvent[0][0] as UpdatePassword).password).toBe('password')
    expect((submitEvent[0][0] as UpdatePassword).password_confirmation).toBe('password-confirm')
    expect(submitEvent).toEqual([[{
      current_password: 'current-password',
      password: 'password',
      password_confirmation: 'password-confirm'
    }]])

  })

})
