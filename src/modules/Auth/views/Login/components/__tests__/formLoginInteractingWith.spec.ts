import { expect, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import FormLogin from '../FormLogin.vue'
import { AppButton, AppInput, AppErrorMessage, AppFlashMessage, AppSelect } from '@/modules/__tests__/globalComponents'
import type { VueWrapper } from '@vue/test-utils'
import type { UpdateUser } from '@/modules/Auth/types/Auth'

type Wrapper = VueWrapper<Partial<{
  email: string;
}>> // Or put "defineExpose({ email })" in components

const factory = () => {
  return mount(FormLogin, {
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
}

describe('ModuleAuthComponentFormLogin.vue', () => {
  it('sets the value', async () => {
    const wrapper = factory()
  
    const input = wrapper.find('[data-testid="email-input"]')
    await input.setValue('user@email.ext')

    expect((input.element as HTMLInputElement).value).toBe('user@email.ext')
  })

  it('emits the input to its parent', async () => {
    const wrapper: Wrapper = factory()

    await wrapper.find('[data-testid="email-input"]').setValue('user@email.ext')
    expect(wrapper.vm.email).toBe('user@email.ext')
  
    await wrapper.trigger('submit.prevent')

    expect((wrapper.emitted('submit')[0][0] as UpdateUser).email).toBe('user@email.ext')  
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted()).toHaveProperty('submit')
  })
})
