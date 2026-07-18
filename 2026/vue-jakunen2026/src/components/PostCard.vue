<!--
  PostCard.vue … 一覧に並ぶ投稿カード1枚分の見た目。
  親（HomeView）から post を受け取って表示するだけの部品。
-->
<script setup>
import { RouterLink } from 'vue-router'

// defineProps … 親から受け取るデータの定義
defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <!-- カード全体をリンクにして、詳細画面（/posts/投稿ID）へ飛ばす -->
  <RouterLink :to="`/posts/${post.id}`" class="post-card">
    <!-- 画像がある投稿だけサムネイルを表示 -->
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
        <!-- いいね数とコメント数 -->
        <span class="meta__item">{{ post.likes }} いいね</span>
        <span class="meta__item">{{ post.comments_count }} コメント</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.post-card {
  display: block;
  border: 1px solid #eee;
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
}

.post-card__author {
  color: #666;
  font-size: 13px;
  margin-bottom: 10px;
}
</style>
