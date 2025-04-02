import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import FormUser from '../FormUser.vue'
import { AppButton, AppInput, AppErrorMessage, AppFlashMessage, AppSelect } from '@/modules/__tests__/globalComponents'
import type { VueWrapper } from '@vue/test-utils'
import type { UpdateUser } from '@/modules/Auth/types/Auth'

type Wrapper = VueWrapper<Partial<{
  name: string;
  email: string;
}>> // Or put "defineExpose({ name, email })" in components

const factory = () => {
  return mount(FormUser, {
    props: {
      message: "",
      error: "",
      sending: true
    },
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
          auth: {
            user: {
              name: "John Doe",
              email: "user@email.ext"
            }
          }, 
        }
      })]
      
    }
  })
}

describe('Profile AuthUserForm/Form Component',  () => {
  it('sets the value from state', async () => {
    const wrapper: Wrapper = factory()
  
    expect(wrapper.vm.name).toBe("John Doe")
    expect(wrapper.vm.email).toBe("user@email.ext")
    
    const inputName = wrapper.get('[data-testid="name-input"]')
    const inputEmail = wrapper.get('[data-testid="email-input"]')

    await nextTick()

    expect((inputName.element as HTMLInputElement).value).toBe('John Doe')
    expect((inputEmail.element as HTMLInputElement).value).toBe('user@email.ext')

  })

  it('emits the input to its parent', async () => {
    const wrapper = factory()
  
    await wrapper.trigger('submit.prevent')

    expect(wrapper.emitted()).toHaveProperty('submit')
    const submitEvent = wrapper.emitted('submit')
    expect(submitEvent).toBeTruthy()
    expect((submitEvent[0][0] as UpdateUser).name).toBe('John Doe')
    expect((submitEvent[0][0] as UpdateUser).email).toBe('user@email.ext')  
    expect(submitEvent).toEqual([[{
      name: 'John Doe', email: 'user@email.ext'
    }]])
  })
})
