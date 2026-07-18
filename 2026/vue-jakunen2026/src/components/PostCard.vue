<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="`/posts/${post.id}`" class="post-card">
    <img
      v-if="post.image_url"
      :src="post.image_url"
      :alt="post.title"
      class="post-card__image"
    />
    <div class="post-card__body">
      <span class="badge">{{ post.category }}</span>
      <h2 class="post-card__title">{{ post.title }}</h2>
      <p class="post-card__author">{{ post.author }}</p>
      <div class="meta">
        <span class="meta__item">♥ {{ post.likes }}</span>
        <span class="meta__item">💬 {{ post.comments_count }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.post-card {
  display: block;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.15s, box-shadow 0.15s;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.post-card__image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.post-card__body {
  padding: 14px 16px 16px;
}

.post-card__title {
  margin: 8px 0 4px;
  font-size: 17px;
  line-height: 1.4;
}

.post-card__author {
  color: #666;
  font-size: 13px;
  margin-bottom: 10px;
}
</style>
