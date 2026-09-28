<script setup>
import { RouterView } from 'vue-router'

import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <v-app>
    <HeaderComponent />

    <main class="contenido-principal">
      <RouterView />
    </main>

    <FooterComponent />
  </v-app>
</template>

<style scoped>
.contenido-principal {
  width: 100%;
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
  box-sizing: border-box;
}
</style>
