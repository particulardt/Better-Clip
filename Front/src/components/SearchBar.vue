<template>
  <div class="search-container">
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Поиск..." 
      class="search-input"
      @keyup.enter="handleSearch"
    />
    <button @click="handleSearch" class="search-button">Найти</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/${searchQuery.value.trim()}`)
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  padding: 8px 12px;
  border: 2px solid #9147ff;
  border-radius: 4px;
  background-color: #1f1f23;
  color: white;
  font-size: 1rem;
  width: 200px;
}

.search-input:focus {
  outline: none;
  border-color: #a970ff;
}

.search-button {
  padding: 8px 16px;
  background-color: #9147ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #a970ff;
}
</style> 