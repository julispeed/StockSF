

<template>
  <div id="app">
    <Header />    
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>

</style>
