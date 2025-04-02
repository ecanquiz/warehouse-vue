import auth from "@/core/middleware/auth"
import admin from "@/core/middleware/admin"

export default [{
    path: "/menus",
    name: "menus",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Authorization/views/Menus/Datagrid/Index.vue").then(m => m.default),
}, {
    path: "/roles",
    name: "roles",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Authorization/views/Roles/Datagrid/Index.vue").then(m => m.default),
}, {
    path: "/roles/create",
    name: "roleCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Authorization/views/Roles/CreateOrEdit/Index.vue").then(m => m.default),
    props: true
}, {
    path: "/roles/edit/:id(\\d+)",
    name: "roleEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Authorization/views/Roles/CreateOrEdit/Index.vue").then(m => m.default),
    props: true
}]
