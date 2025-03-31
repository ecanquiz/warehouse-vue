import { describe, it, vi, expect, afterEach,  afterAll} from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import router from '@/core/router'
import Menu from '../Index.vue'
import data from "./data"
import nav from "./nav"
import type { MockWithScrollTo } from "@/core/types/Mock"

vi.mock("@/modules/Auth/services", () => ({
  getAuthMenu: vi.fn(() => ({ data }))
}));

(window.scrollTo as MockWithScrollTo) = vi.fn();
afterEach(() => { vi.resetAllMocks() });
afterAll(() => { vi.clearAllMocks() });

describe('RecursiveMenu', ()=> {

  it('should render recursive menu', async () => {

    const wrapper = mount(Menu, {
      global: {
        plugins: [          
          router,
          createTestingPinia({
            initialState: {
              auth: {
                user: {
                  name: "John Doe",
                  email: "user@email.ext"
                }
              } 
            }
          })
        ],
        stubs: {
          AppLink: true
        }
      }
    })

    await flushPromises()

    expect(wrapper.html()).toEqual(nav)
    expect(true).toBe(true)
  })

})
