import { createRouter, createWebHistory } from 'vue-router'
import Egresos from '@/views/Egresos.vue'
import CreateArticulo from '@/views/CreateArticulo.vue'
import Grupo from '@/views/Grupos.vue'
import Familia from '@/views/Familia.vue'
import CreateDeposito from '@/views/CreateDepositos.vue'
import CreateProveedor from '@/views/CreateProveedor.vue'


const routes = [
  { path: '/egresos', name: 'Egreso', component: Egresos },
  { path: '/createArticulo', name: 'CreateArticulo', component: CreateArticulo },
  { path: '/Grupos', name: 'Grupo', component: Grupo },
  { path: '/Familia', name: 'Familia', component: Familia },
  { path: '/CreateDepositos', name: 'CreateDeposito', component: CreateDeposito },
  { path: '/CreateProveedor', name: 'CreateProveedor', component: CreateProveedor}
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
