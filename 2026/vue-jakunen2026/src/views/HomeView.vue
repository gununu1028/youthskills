<!--
  HomeView.vue … トップ画面。投稿の一覧を取得し、検索・絞り込み・並び替えをして表示する。
-->
<script setup>
// ref       … 中身が変わると画面も自動で更新される「箱」を作る
// computed  … 他のデータから計算して求める値（元が変わると自動で計算し直す）
// onMounted … 画面が表示された直後に一度だけ実行される処理
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchPosts, fetchCategories } from '../api'
import PostCard from '../components/PostCard.vue'
import PostFilters from '../components/PostFilters.vue'

// サーバーから取得したデータを入れておく箱
const posts = ref([]) // 投稿の一覧
const categories = ref([]) // カテゴリの一覧
const loading = ref(true) // 読み込み中かどうか（最初はtrue）
const error = ref('') // エラーメッセージ（空なら正常）

// フィルタの状態（PostFiltersコンポーネントとv-modelで連動する）
const search = ref('') // 検索キーワード
const categoryId = ref('all') // 選択中のカテゴリ（'all'は全件）
const sort = ref('newest') // 並び順

// 画面表示直後にサーバーからデータを取りに行く
onMounted(async () => {
  try {
    // Promise.all … 2つの通信を同時に走らせ、両方そろうまで待つ（順番に待つより速い）
    const [postList, categoryList] = await Promise.all([
      fetchPosts(),
      fetchCategories(),
    ])
    posts.value = postList
    categories.value = categoryList
  } catch (e) {
    // 通信が失敗したらエラーメッセージを表示用に保存
    error.value = e.message
  } finally {
    // 成功・失敗どちらでも、最後に読み込み中フラグを下ろす
    loading.value = false
  }
})

// 実際に画面へ表示する投稿。検索・カテゴリ・並び替えを組み合わせて計算する。
// posts や search などが変わると、この値も自動で計算し直される。
const visiblePosts = computed(() => {
  // 元の配列を壊さないようコピーしてから加工する（[...] は配列の複製）
  let result = [...posts.value]

  // カテゴリフィルタ：'all'以外なら選んだカテゴリだけに絞る
  if (categoryId.value !== 'all') {
    result = result.filter((p) => p.category_id === categoryId.value)
  }

  // 検索（タイトル・内容の部分一致）。前後の空白を除き、小文字化して大小無視で比較。
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
    // 新着順（投稿IDの大きい順ほど新しいとみなす）
    result.sort((a, b) => b.id - a.id)
  }

  return result
})
</script>

<template>
  <div class="home">
    <div class="home__toolbar">
      <!-- 新規投稿フォームへのリンク -->
      <RouterLink to="/posts/new" class="btn btn--primary">＋ 新規投稿</RouterLink>
    </div>

    <!--
      検索・絞り込みUI。v-model:xxx は子コンポーネントとの双方向バインディング。
      子で値が変わればここの search/categoryId/sort も更新され、逆も同じ。
      :categories は子へデータを渡すだけ（一方向）。
    -->
    <PostFilters
      v-model:search="search"
      v-model:category-id="categoryId"
      v-model:sort="sort"
      :categories="categories"
    />

    <!--
      状態に応じて表示を切り替える。
      v-if / v-else-if / v-else は上から順に条件を判定し、最初に当てはまった1つだけ表示する。
    -->
    <p v-if="loading" class="state-message">読み込み中...</p>
    <p v-else-if="error" class="state-message">{{ error }}</p>
    <p v-else-if="visiblePosts.length === 0" class="state-message">
      検索結果が見つかりませんでした
    </p>

    <!-- 上のどれにも当てはまらない＝正常に表示できる場合 -->
    <div v-else class="home__list">
      <!-- v-for で配列を1件ずつPostCardとして描画。:key はVueが要素を見分けるための目印 -->
      <PostCard v-for="post in visiblePosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<style scoped>
.home__toolbar {
  text-align: right;
  margin-bottom: 16px;
}

.home__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
