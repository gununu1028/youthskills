<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchPosts, fetchCategories } from '../api'
import PostCard from '../components/PostCard.vue'
import PostFilters from '../components/PostFilters.vue'

const posts = ref([])
const categories = ref([])
const loading = ref(true)
const error = ref('')

// フィルタの状態
const search = ref('')
const categoryId = ref('all')
const sort = ref('newest')

onMounted(async () => {
  try {
    // 一覧とカテゴリを並行で取得する
    const [postList, categoryList] = await Promise.all([
      fetchPosts(),
      fetchCategories(),
    ])
    posts.value = postList
    categories.value = categoryList
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

// 検索・カテゴリフィルタ・並び替えを組み合わせて適用する
const visiblePosts = computed(() => {
  let result = [...posts.value]

  // カテゴリフィルタ
  if (categoryId.value !== 'all') {
    result = result.filter((p) => p.category_id === categoryId.value)
  }

  // 検索（タイトル・内容の部分一致）
  const keyword = search.value.trim().toLowerCase()
  if (keyword) {
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(keyword) ||
        p.content.toLowerCase().includes(keyword),
    )
  }

  // 並び替え
  if (sort.value === 'likes') {
    // いいね数の多い順
    result.sort((a, b) => b.likes - a.likes)
  } else {
    // 新着順（投稿IDの大きい順を新着とみなす）
    result.sort((a, b) => b.id - a.id)
  }

  return result
})
</script>

<template>
  <div class="home">
    <div class="home__toolbar">
      <RouterLink to="/posts/new" class="btn btn--primary">＋ 新規投稿</RouterLink>
    </div>

    <PostFilters
      v-model:search="search"
      v-model:category-id="categoryId"
      v-model:sort="sort"
      :categories="categories"
    />

    <p v-if="loading" class="state-message">読み込み中...</p>
    <p v-else-if="error" class="state-message">{{ error }}</p>
    <p v-else-if="visiblePosts.length === 0" class="state-message">
      検索結果が見つかりませんでした
    </p>

    <div v-else class="home__list">
      <PostCard v-for="post in visiblePosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<style scoped>
.home__toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.home__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
