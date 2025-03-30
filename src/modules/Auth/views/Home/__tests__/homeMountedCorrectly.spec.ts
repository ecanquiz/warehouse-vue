import { afterEach, beforeEach, expect, test, vi } from "vitest"
import { shallowMount } from "@vue/test-utils"
import router from "@/modules/Auth/__tests__/router"
import AppLink from "@/core/components/AppLink.vue"
import Home from "../Index.vue"
import type { MockWithScrollTo } from "@/core/types/Mock"

beforeEach(() => { (window.scrollTo as MockWithScrollTo) = vi.fn() })
afterEach(() => { vi.clearAllMocks() })

test("component must be mounted correctly", async () => {

  const wrapper = shallowMount(Home, {
    global: {
      plugins: [ router ],
      components: { AppLink }
    }
  }) 
   
  expect(wrapper.find('[data-testid="login-link"]').exists()).toBe(true)   
  expect(wrapper.find('[data-testid="register-link"]').exists()).toBe(true)
  
})
