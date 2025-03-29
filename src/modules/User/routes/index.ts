import auth from "@/core/middleware/auth"
import admin from "@/core/middleware/admin"

export default [{
    path: "/users",
    name: "users",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/User/views/Datagrid/Index.vue").then(m => m.default)
}, {
    path: "/users/create",
    name: "userCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/User/views/CreateOrEdit/Index.vue").then(m => m.default),
    props: true
}, {
    path: "/users/edit/:id(\\d+)",
    name: "userEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/User/views/CreateOrEdit/Index.vue").then(m => m.default),
    props: true
}]
