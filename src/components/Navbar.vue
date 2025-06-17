<template>
  <nav class="navbar">
    <router-link to="/"><strong>Inicio</strong></router-link>    
    <router-link to="/Egresos"><strong>Egresos</strong></router-link>    
    <div class="dropdown" @mouseleave="isArticulosOpen = false">
      <button @click="ToggleArticulos"><strong>Artículos ▼</strong></button>
      <div v-if="isArticulosOpen" class="dropdown-content">
        <router-link to="/createarticulo" @click="closeMenu">Crear Artículo</router-link>
        <router-link to="/mantenimientoarticulo" @click="closeMenu">Mantenimiento de Artículos</router-link>
        <router-link to="/Grupos" @click="closeMenu">Grupos</router-link>
        <router-link to="/Familia" @click="closeMenu">Familias</router-link>
      </div>
    </div>
    <div class="dropdown" @mouseleave="isDepositosOpen = false">
    <button @click="ToggleDepositos"><strong>Depósitos ▼</strong></button>
     <div v-if="isDepositosOpen" class="dropdown-content">
        <router-link to="/createDepositos" @click="closeMenu">Crear Depósito</router-link>
        <router-link to="/createarticulo" @click="closeMenu">Mantenimiento de Depósitos</router-link>
      </div>
    </div>
    <div class="dropdown" @mouseleave="isProveedoresOpen = false">
    <button @click="ToggleProveedores"><strong>Proveedores ▼</strong></button>
     <div v-if="isProveedoresOpen" class="dropdown-content">
        <router-link to="/CreateProveedor" @click="closeMenu">Crear Proveedor</router-link>
        <router-link to="/" @click="closeMenu">Mantenimiento de Proveedor</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isArticulosOpen = ref(false);
const isDepositosOpen = ref(false);
const isProveedoresOpen = ref(false);

function ToggleArticulos() {
  isArticulosOpen.value = !isArticulosOpen.value;
  isDepositosOpen.value = false;
  isProveedoresOpen.value = false;
}

function ToggleDepositos() {
  isDepositosOpen.value = !isDepositosOpen.value;
  isArticulosOpen.value = false;
  isProveedoresOpen.value = false
}
function ToggleProveedores() {
  isProveedoresOpen.value = !isProveedoresOpen.value;
  isDepositosOpen.value = false;
  isArticulosOpen.value = false;
}

function closeMenu() {
  isArticulosOpen.value = false;
  isDepositosOpen.value = false;
  isProveedoresOpen.value = false
}

</script>

<style scoped>
strong
{  
  margin-right: 1rem;
  
}
.navbar {
  background: #333;
  padding: 1rem;
}
.navbar a {
  color: rgb(255, 255, 255);
  margin-right: 1rem;
  text-decoration: none;
}


.router-link-active {
  font-weight: bold;
  text-decoration: underline;  
}


.navbar {
  background: #333;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
  background: #444;
  padding: 0.5rem;
  border: 1px solid #222;
  display: flex;
  flex-direction: column;
  min-width: 200px;
}

.dropdown-content a {
  margin: 0.25rem 0;
  color: white;
}

.navbar a,
.navbar button {
  color: white;
  margin-right: 1rem;
  text-decoration: none;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.navbar button:focus {
  outline: none;
}

</style>
