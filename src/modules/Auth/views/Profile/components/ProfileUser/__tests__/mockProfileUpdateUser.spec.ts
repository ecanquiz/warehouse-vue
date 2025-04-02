import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ProfileUser from '../Index.vue'
import { updateUser } from "@/modules/Auth/services"
import * as MockService from "@/modules/__tests__/apiMock/AuthService"
import { AppButton, AppInput, AppErrorMessage, AppFlashMessage, AppSelect } from '@/modules/__tests__/globalComponents'
import type { Mock } from 'vitest'

const payload = {
  name: "John Doe",
  email: "user@email.ext"
}

describe('ModuleauthComponentProfileUser.vue',  async () => {
  it('should be called updateUser with payload', async () => {
    const wrapper = mount(ProfileUser, {
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

    vi.mock("@/modules/Auth/services");
    (updateUser as Mock).mockImplementation(MockService.updateUser); 
    
    expect(await updateUser({})).toBe("User updated.");

  })  
})
