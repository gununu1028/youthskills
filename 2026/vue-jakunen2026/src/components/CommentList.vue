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
}

.comments__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comment {
  background: #eee;
  padding: 12px 14px;
}

.comment__author {
  font-size: 13px;
  margin-bottom: 4px;
}
</style>
