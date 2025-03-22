import {createRouter, createWebHistory} from 'vue-router'
import {computed} from "vue"
import {useAuthStore} from '@/modules/Auth/stores'
import middlewarePipeline from "@/router/middlewarePipeline"
import type {RouteRecordRaw} from 'vue-router'

const storeAuth = computed(() => useAuthStore())

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  
  routes: [] as Array<RouteRecordRaw>,
  scrollBehavior(to, from, savedPosition): any {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

const moduleRoutes = import.meta.glob('@/modules/**/routes/index.ts', {
  eager: true,
  import: 'default'
})

Object.values(moduleRoutes).forEach((routes: RouteRecordRaw[]) => 
  routes.forEach((route: RouteRecordRaw) =>
    router.addRoute(route)
  )  
)

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware;
  const context = { to, from, next, storeAuth };

  if (!middleware) {
    return next();
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router
