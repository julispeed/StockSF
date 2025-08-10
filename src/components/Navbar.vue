<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Stock Web</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary>      
      <v-list dense>
        <v-list-item link :to="{ path: '/inicio' }">
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>

        <v-list-item link :to="{ path: '/movimientos' }">
          <v-list-item-title>Movimientos</v-list-item-title>
        </v-list-item>

        <v-list-item link :to="{ path: '/articulos' }">
          <v-list-item-title>Articulos</v-list-item-title>
        </v-list-item>

        <v-list-item link :to="{ path: '/depositos' }">
          <v-list-item-title>Depositos</v-list-item-title>
        </v-list-item>

        <v-list-item link :to="{ path: '/Proveedor' }">
          <v-list-item-title>Proveedores</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
