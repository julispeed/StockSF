<template>
  <nav class="navbar">
    <router-link to="/"><strong>Inicio</strong></router-link>    
    <router-link to="/Egresos"><strong>Egresos</strong></router-link>    
    <div class="dropdown" @mouseleave="isDropdownOpen = false">
      <button @click="toggleDropdown"><strong>Artículos ▼</strong></button>
      <div v-if="isDropdownOpen" class="dropdown-content">
        <router-link to="/createarticulo" @click="closeDropdown">Crear Artículo</router-link>
        <router-link to="/mantenimientoarticulo" @click="closeDropdown">Mantenimiento de Artículos</router-link>
        <router-link to="/Grupos" @click="closeDropdown">Grupos</router-link>
        <router-link to="/Familia" @click="closeDropdown">Familias</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isDropdownOpen = ref(false)

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function closeDropdown() {
  isDropdownOpen.value = false
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
