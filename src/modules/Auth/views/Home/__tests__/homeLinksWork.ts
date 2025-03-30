import { afterEach, beforeEach, describe, expect, it, vi} from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import { createPinia } from "pinia"
import router from "@/modules/Auth/__tests__/router"
import AppLink from "@/core/components/AppLink.vue"
import Home from "../Index.vue"
import type { MockWithScrollTo } from "@/core/types/Mock"


const FlashMessage = { }

beforeEach(() => { (window.scrollTo as MockWithScrollTo) = vi.fn() })
afterEach(() => { vi.clearAllMocks() })

const factory = () => {
  return mount(Home, {
    global: {
      plugins: [createPinia(), router],
      stubs: { FlashMessage: true },
      components: { AppLink }
    }
  })
}

describe("@/modules/Auth/views/Home.vue", () => {

  it("this should go to the register page", async () => {

    const wrapper = factory()

    router.push('/')
    await router.isReady()

    await wrapper.get('[data-testid="register-link"]').trigger('click')

    await flushPromises()

    expect(global.location.pathname).toBe('/register')
    //expect(wrapper.html()).toContain('Registrarse')
  })

  it("this should go to the login page", async () => {

    const wrapper = factory()

    router.push("/")
    await router.isReady()

    await wrapper.get('[data-testid="login-link"]').trigger("click")

    await flushPromises()  

    expect(global.location.pathname).toBe("/login")
    //expect(wrapper.html()).toContain("Inicio de Sesión")

  })
})
