import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import router from '@/core/router'
import AppLink from "@/core/components/AppLink.vue"
import LoginIndex from '../Index.vue'
import type { MockWithScrollTo } from '@/core/types/Mock'

beforeEach(() => { (window.scrollTo as MockWithScrollTo) = vi.fn() })
afterEach(() => { vi.clearAllMocks() })

test('component must be mounted correctly', async () => {

  const wrapper = shallowMount(LoginIndex, {
    global: {
      plugins: [createPinia(), router],
      components: { AppLink }
    }
  })
  
  expect(wrapper.html()).toContain('Inicio de Sesión')
  expect(wrapper.html()).toContain('form-login-stub')     
  expect(wrapper.find('[data-testid="register-link"]').exists()).toBe(true)

  const forgotPasswordLink = wrapper.find('[data-testid="forgot-password-link"]')
  expect(forgotPasswordLink.exists()).toBe(true)  
  expect(forgotPasswordLink.html()).toContain('to="/forgot-password"') 
  
})
