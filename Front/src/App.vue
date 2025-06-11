<template>
  <div class="app">
    <h1>BetterClip</h1>
    <ClipViewer />
  </div>
</template>

<script setup>
import ClipViewer from './components/ClipViewer.vue'
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

h1 {
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: #9147ff;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style> 