<template>
  <div class="app">
    <div class="header">
      <h1 @click="router.push('/')" class="logo">BetterClip</h1>
      <SearchBar />
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import SearchBar from './components/SearchBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #0e0e10;
  color: white;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.logo {
  margin: 0;
  font-size: 2.5rem;
  color: #9147ff;
  cursor: pointer;
  transition: color 0.2s;
}

.logo:hover {
  color: #a970ff;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style> 