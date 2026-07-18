<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchPost } from '../api'
import CommentList from '../components/CommentList.vue'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
})

const router = useRouter()
const post = ref(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    post.value = await fetchPost(props.id)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="detail">
    <button class="btn btn--ghost" @click="goBack">← 戻る</button>

    <p v-if="loading" class="state-message">読み込み中...</p>
    <p v-else-if="error" class="state-message">{{ error }}</p>

    <article v-else-if="post" class="detail__article">
      <img
        v-if="post.image_url"
        :src="post.image_url"
        :alt="post.title"
        class="detail__image"
      />
      <span class="badge">{{ post.category }}</span>
      <h1 class="detail__title">{{ post.title }}</h1>
      <div class="meta detail__meta">
        <span class="meta__item">投稿者：{{ post.author }}</span>
        <span class="meta__item">♥ {{ post.likes }}</span>
      </div>
      <p class="detail__content">{{ post.content }}</p>

      <CommentList :comments="post.comments" />
    </article>
  </div>
</template>

<style scoped>
.detail__article {
  margin-top: 16px;
}

.detail__image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 16px;
}

.detail__title {
  font-size: 22px;
  line-height: 1.4;
  margin: 10px 0;
}

.detail__meta {
  margin-bottom: 16px;
}

.detail__content {
  white-space: pre-wrap;
  line-height: 1.8;
}
</style>
