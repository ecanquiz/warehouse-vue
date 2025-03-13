import auth from "@/middleware/auth"
import admin from "@/middleware/admin"

export default [{
    path: "/inputs",
    name: "inputs",
    meta: { middleware: [auth, admin] },    
    component: () => import("@/modules/Warehouse/views/Movement/Index.vue").then(m => m.default),
    props: true
}, {
    path: "/inputs/create",
    name: "inputs-create",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/inputs/edit/:id(\\d+)",
    name: "inputs-edit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/outputs",
    name: "outputs",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/Index.vue").then(m => m.default)
}, {
    path: "/outputs/create",
    name: "outputs-create",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/outputs/edit/:id(\\d+)",
    name: "outputs-edit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/CreateOrEdit.vue").then(m => m.default),
    props: true
},{
    path: "/input-reverses",
    name: "input-reverses",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/Index.vue").then(m => m.default)
}, {
    path: "/input-reverses/create",
    name: "input-reverses-create",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/input-reverses/edit/:id(\\d+)",
    name: "input-reverses-edit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/output-reverses",
    name: "output-reverses",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/Index.vue").then(m => m.default)
}, {
    path: "/output-reverses/create",
    name: "output-reverses-create",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/output-reverses/edit/:id(\\d+)",
    name: "output-reverses-edit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/movements",
    name: "movements",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/Index.vue").then(m => m.default)
}, {
    path: "/movements/create",
    name: "movementCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/movements/edit/:id(\\d+)",
    name: "movementEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Movement/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/daily-closings",
    name: "daily-closings",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/DailyClosing/Index.vue").then(m => m.default)
}, {
    path: "/daily-closings/create",
    name: "daily-closings-create",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/DailyClosing/Create.vue").then(m => m.default)
}, {
    path: "/daily-closings/show/:close",
    name: "daily-closings-show",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/DailyClosing/Show.vue").then(m => m.default)
}, {
    path: "/summary",
    name: "summary",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Existence.vue").then(m => m.default),
}, {
    path: "/warehouses",
    name: "warehouses",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Warehouse/Index.vue").then(m => m.default)
}, {
    path: "/warehouses/create",
    name: "warehouseCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Warehouse/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/warehouses/edit/:id(\\d+)",
    name: "warehouseEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Warehouse/CreateOrEdit.vue").then(m => m.default),
    props: true
}/*, {
    path: "/articles",
    name: "articles",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/Article/Index.vue").then(m => m.default),
    props: true
}*/
, {
    path: "/article-warehouse",
    name: "article-warehouse",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/ArticleWarehouse/Index.vue").then(m => m.default)
}, {
    path: "/article-warehouse/create",
    name: "article-warehouseCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/ArticleWarehouse/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/article-warehouse/edit/:id(\\d+)",
    name: "article-warehouseEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Warehouse/views/ArticleWarehouse/CreateOrEdit.vue").then(m => m.default),
    props: true
}]

