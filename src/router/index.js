import { createRouter, createWebHistory } from 'vue-router'
import Articulos from '@/views/Articulos.vue'
import Movimientos from '@/views/Movimientos.vue'
import CreateArticulo from '@/views/viewArticulos/CreateArticulo.vue'
import Grupo from '@/views/viewArticulos/Grupos.vue'
import Familia from '@/views/viewArticulos/Familia.vue'
import CreateDeposito from '@/views/viewDepositos/Depositos.vue'
import CreateProveedor from '@/views/viewProveedores/Proveedor.vue'
import MantenimientoArticulos from '@/views/viewArticulos/MantenimientoArticulos.vue'


const routes = [
  { path: '/articulos', name: 'Articulos', component: Articulos },
  { path: '/movimientos', name: 'Egreso', component: Movimientos },
  { path: '/createArticulo', name: 'CreateArticulo', component: CreateArticulo },
  { path: '/Grupos', name: 'Grupo', component: Grupo },
  { path: '/Familia', name: 'Familia', component: Familia },
  { path: '/Depositos', name: 'CreateDeposito', component: CreateDeposito },
  { path: '/Proveedor', name: 'CreateProveedor', component: CreateProveedor},
  { path: '/MantenimientoArticulos', name: 'MantenimientoArticulos', component: MantenimientoArticulos}
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
