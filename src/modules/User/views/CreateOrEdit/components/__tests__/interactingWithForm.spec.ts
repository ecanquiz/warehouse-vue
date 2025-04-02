import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormCreateOrEdit from '../FormCreateOrEdit.vue'
import {
  AppButton,
  AppInput,
  AppErrorMessage,
  AppFlashMessage,
  AppSelect
} from '@/modules/__tests__/globalComponents'
import type User from '@/modules/User/types/User'

describe('UserForm Component',  () => {
  it('emits the input to its parent', async () => {
    const wrapper = mount(FormCreateOrEdit, {
        global: {
        components: {
          AppButton,
          AppInput,
          AppErrorMessage,
          AppFlashMessage,
          AppSelect
        }
      },
      props: {
        id: "1",
        user: {
          name: "John Doe",
          email: "user@email.ext",
          password: "password",
          role_id: "1"
        },
        sending: false,
        errors: [],
        roles: [],
      }
    })
    
    await wrapper.trigger('submit.prevent')

    expect(wrapper.emitted()).toHaveProperty('submit')
    const submitEvent = wrapper.emitted('submit')
    expect(submitEvent).toBeTruthy()
    expect((submitEvent[0][0] as User).name).toBe('John Doe')
    expect((submitEvent[0][0] as User).email).toBe('user@email.ext')  
    expect((submitEvent[0][0] as User).password).toBe('password')    
    expect(submitEvent).toEqual(
      [
        [
          {
            name: 'John Doe',
            email: 'user@email.ext',
            password: 'password',
            role_id: "1"
          },
          '1'
        ]
      ]
    )    
  })
})
