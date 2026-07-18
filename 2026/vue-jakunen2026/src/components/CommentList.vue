<!--
  CommentList.vue … 投稿に付いたコメントの一覧を表示する部品。
-->
<script setup>
// 親から受け取るコメント配列。渡されなかった場合は空配列を初期値にする
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

    <!-- 1件も無いときの案内 -->
    <p v-if="comments.length === 0" class="state-message">
      コメントがありません
    </p>

    <!-- コメントを1件ずつリスト表示。:key には順番（index）を使っている -->
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
