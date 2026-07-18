<script setup>
defineProps({
  comments: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="comments">
    <h3 class="comments__heading">コメント</h3>

    <p v-if="comments.length === 0" class="state-message">
      コメントがありません
    </p>

    <ul v-else class="comments__list">
      <li v-for="(comment, index) in comments" :key="index" class="comment">
        <p class="comment__author">{{ comment.author }}</p>
        <p class="comment__body">{{ comment.body }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.comments {
  margin-top: 24px;
}

.comments__heading {
  font-size: 16px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.comments__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comment {
  background: #eee;
  border-radius: 8px;
  padding: 12px 14px;
}

.comment__author {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
}

.comment__body {
  font-size: 14px;
}
</style>
