import { expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import FormLogin from '../FormLogin.vue'
import { AppButton, AppInput, AppErrorMessage, AppFlashMessage, AppSelect } from '@/modules/__tests__/globalComponents'

const FlashMessage = {}

test('component must be mounted correctly', async () => {

  const wrapper = shallowMount(FormLogin, {
    global: {
      components: {
        AppButton,
        AppInput,
        AppErrorMessage,
        AppFlashMessage,
        AppSelect
      },
      stubs: { FlashMessage: true }
    }    
  })

  const form = wrapper.find('form')
  const submitBtn = wrapper.find('[data-testid="submit-btn"]');
  const emailInput = wrapper.find('[data-testid="email-input"]');
  const passwordInput = wrapper.find('[data-testid="password-input"]');
  
  expect(form.exists()).toBe(true)     
  expect(submitBtn.exists()).toBe(true)
  expect(submitBtn.html()).toContain('type="submit"')
  expect(emailInput.exists()).toBe(true)
  expect(passwordInput.exists()).toBe(true)
  
})
