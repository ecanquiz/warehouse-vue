import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from '../FormRegister.vue'
import { AppButton, AppInput, AppErrorMessage, AppFlashMessage, AppSelect } from '@/modules/__tests__/globalComponents'
import type {FormRegister as Register} from '@/modules/Auth/types/Auth'

describe('ModuleAuthComponentFormRegister.vue', () => {

  it('sets the value and emits the input to its parent', async () => {
    const wrapper = mount( Form , {
      global: {
        components: {
          AppButton,
          AppInput,
          AppErrorMessage,
          AppFlashMessage,
          AppSelect
        }
      }
    })

    const inputName = wrapper.find('[data-testid="name-input"]')
    const inputEmail = wrapper.find('[data-testid="email-input"]')
    const inputPassword = wrapper.find('[data-testid="password-input"]')
    const inputConfirmPassword = wrapper.find('[data-testid="confirm-password-input"]')
    
    await inputName.setValue('John Doe')
    await inputEmail.setValue('user@email.ext')
    await inputPassword.setValue('password')
    await inputConfirmPassword.setValue('password')
    
    expect((inputName.element as HTMLInputElement).value).toBe('John Doe')
    expect((inputEmail.element as HTMLInputElement).value).toBe('user@email.ext')
    expect((inputPassword.element as HTMLInputElement).value).toBe('password')
    expect((inputConfirmPassword.element as HTMLInputElement).value).toBe('password')
  
    await wrapper.trigger('submit.prevent')

    expect((wrapper.emitted('submit')[0][0] as Register).name).toBe('John Doe')
    expect((wrapper.emitted('submit')[0][0] as Register).email).toBe('user@email.ext')
    expect((wrapper.emitted('submit')[0][0] as Register).password).toBe('password')
    expect((wrapper.emitted('submit')[0][0] as Register).passwordConfirm).toBe('password')  
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted()).toHaveProperty('submit')
  })
})
