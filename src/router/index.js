import { createRouter, createWebHistory } from 'vue-router'
import Articulos from '@/views/Articulos.vue'
import Movimientos from '@/views/Movimientos.vue'
import CreateDeposito from '@/views/Depositos.vue'
import CreateProveedor from '@/views/Proveedor.vue'

import Inicio from '@/views/Inicio.vue' 


const routes = [
  { path: '/articulos', name: 'Articulos', component: Articulos },
  { path: '/movimientos', name: 'Egreso', component: Movimientos },
  { path: '/Depositos', name: 'CreateDeposito', component: CreateDeposito },
  { path: '/Proveedor', name: 'CreateProveedor', component: CreateProveedor}, 
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
