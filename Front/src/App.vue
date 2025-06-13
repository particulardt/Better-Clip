<template>
  <div class="app">
    <div class="header">
      <h1>BetterClip</h1>
      <SearchBar />
    </div>
    <ClipViewer />
  </div>
</template>

<script setup>
import ClipViewer from './components/ClipViewer.vue'
import SearchBar from './components/SearchBar.vue'
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

h1 {
  margin: 0;
  font-size: 2.5rem;
  color: #9147ff;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style> 