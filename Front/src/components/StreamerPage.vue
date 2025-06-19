<template>
  <div class="streamer-page">
    <h1>Страница стримера: {{ streamerName }}</h1>
    <div v-if="loading" class="loading">Загрузка клипов...</div>
    <div v-else>
      <div v-if="clips.length === 0">Клипы не найдены.</div>
      <div v-else class="clips-list">
        <div v-for="clip in clips[0]" :key="clip.id" class="clip-embed-block">
          <iframe
            v-if="clip.embed_url"
            :src="clip.embed_url + '&parent=localhost'"
            frameborder="0"
            allowfullscreen="true"
            scrolling="no"
            height="378"
            width="620"
          ></iframe>
          <div v-else class="no-embed">Нет embed_url для этого клипа</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const streamerName = ref('')
const clips = ref([])
const loading = ref(true)

const fetchClips = async () => {
  loading.value = true
  try {
    const response = await fetch(`http://localhost:3001/clips/${route.params.name}`)
    const data = await response.json()
    console.log('Ответ от сервера /clips/:streamerId:', data)
    clips.value = Array.isArray(data.clips) ? data.clips : []
  } catch (e) {
    clips.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  streamerName.value = route.params.name
  fetchClips()
})

watch(() => route.params.name, (newName) => {
  streamerName.value = newName
  fetchClips()
})
</script>

<style scoped>
.streamer-page {
  min-height: 100vh;
  background-color: #8A2BE2;
  color: white;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.streamer-page h1 {
  max-width: 100vw;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  box-sizing: border-box;
  margin: 0 auto 2rem auto;
  text-align: center;
  word-break: break-word;
}
.clips-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(620px, 1fr));
  gap: 2rem;
  width: 100vw;
  max-width: 100vw;
  margin: 0 auto;
  justify-items: center;
  align-items: start;
}
.clip-embed-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a1a;
  border-radius: 8px;
  /* padding: 1rem; */
  width: 620px;
  height: 378px;
  box-sizing: border-box;
  overflow: hidden;
}
.clip-embed-block iframe {
  width: 620px;
  height: 378px;
  min-width: 0;
  display: block;
  border-radius: 8px;
}
.no-embed {
  color: #ffb3b3;
  margin: 1rem 0;
}
.loading {
  font-size: 1.2rem;
  margin-top: 2rem;
}
@media (max-width: 700px) {
  .clips-list {
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100vw;
    max-width: 100vw;
  }
  .clip-embed-block,
  .clip-embed-block iframe {
    width: 100vw !important;
    max-width: 100vw !important;
    height: auto !important;
    min-width: 0;
    border-radius: 0;
  }
}
</style> 