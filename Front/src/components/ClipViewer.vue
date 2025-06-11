<template>
  <div class="clip-viewer">
    <div class="clip-container" v-if="clipUrl">
      <iframe
        :src="clipUrl"
        frameborder="0"
        allowfullscreen="true"
        scrolling="no"
        height="378"
        width="620"
      ></iframe>
    </div>
    <div class="clip-container" v-else>
      <div class="placeholder">
        Нажмите кнопку, чтобы получить клип
      </div>
    </div>
    <button @click="fetchClip" class="fetch-button">
      Получить клип
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const clipUrl = ref('')

const fetchClip = async () => {
  try {
    const response = await fetch('http://localhost:3001/randomClip')
    const data = await response.json();
    console.log(data);

    // console.log(data);
    if (data.clip.embed_url) {
      clipUrl.value = data.clip.embed_url + "&parent=localhost";
    }
  } catch (error) {
    console.error('Ошибка при получении клипа:', error)
  }
}
</script>

<style scoped>
.clip-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.clip-container {
  width: 620px;
  height: 378px;
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
}

.placeholder {
  color: #666;
  font-size: 1.2rem;
  text-align: center;
}

.fetch-button {
  padding: 12px 24px;
  background-color: #9147ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.fetch-button:hover {
  background-color: #772ce8;
}

.fetch-button:active {
  background-color: #5c16c5;
}
</style> 