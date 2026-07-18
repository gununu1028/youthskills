<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="app-header__title">かがわコミュニティ</RouterLink>
  </header>
  <main class="app-main">
    <RouterView />
  </main>
</template>
