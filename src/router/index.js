import { createRouter, createWebHistory } from 'vue-router'
import Articulos from '@/views/Articulos.vue'
import Movimientos from '@/views/Movimientos.vue'
import Deposito from '@/views/Depositos.vue'
import Proveedor from '@/views/Proveedor.vue'
import Listados from '@/views/Listados.vue'
import Inicio from '@/views/Inicio.vue' 


const routes = [
  { path: '/articulos', name: 'Articulos', component: Articulos },
  { path: '/movimientos', name: 'Movimientos', component: Movimientos },
  { path: '/Depositos', name: 'Depositos', component: Deposito },
  { path: '/Proveedor', name: 'Proveedores', component: Proveedor}, 
  { path: '/Listados', name: 'Listados', component: Listados}, 
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
