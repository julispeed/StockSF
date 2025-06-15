

<template>
  <div id="app">
    <Header />    
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Navbar from './components/Navbar.vue'
</script>

<style>

</style>
