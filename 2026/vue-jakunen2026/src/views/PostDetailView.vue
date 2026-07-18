<!--
  PostDetailView.vue … 投稿1件の詳細画面。URLの :id を使って対象の投稿を取得し表示する。
-->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // 画面遷移を命令的に行うための関数
import { fetchPost } from '../api'
import CommentList from '../components/CommentList.vue'

// ルーター設定で props: true にしたので、URLの :id をpropsとして受け取れる
const props = defineProps({
  id: {
    type: [String, Number], // URL由来なので文字列・数値どちらも許容
    required: true,
  },
})

const router = useRouter() // router.push(...) でプログラムから画面を移動できる
const post = ref(null) // 取得した投稿データ（まだ無い間はnull）
const loading = ref(true) // 読み込み中フラグ
const error = ref('') // エラーメッセージ

// 画面表示直後に、該当IDの投稿をサーバーから取得する
onMounted(async () => {
  try {
    post.value = await fetchPost(props.id)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

// 「← 戻る」ボタン用。トップ画面へ移動する
function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="detail">
    <!-- @click はクリック時のイベント。goBack関数を呼ぶ -->
    <button class="btn" @click="goBack">← 戻る</button>

    <!-- 読み込み中・エラー・取得成功の3状態で表示を切り替える -->
    <p v-if="loading" class="state-message">読み込み中...</p>
    <p v-else-if="error" class="state-message">{{ error }}</p>

    <article v-else-if="post" class="detail__article">
      <!-- 画像URLがある投稿だけ画像を表示（v-if） -->
      <img
        v-if="post.image_url"
        :src="post.image_url"
        :alt="post.title"
        class="detail__image"
      />
      <!-- {{ }} はデータを画面に埋め込む書き方（マスタッシュ構文） -->
      <span class="badge">{{ post.category }}</span>
      <h1 class="detail__title">{{ post.title }}</h1>
      <div class="meta detail__meta">
        <span class="meta__item">投稿者：{{ post.author }}</span>
        <span class="meta__item">{{ post.likes }} いいね</span>
      </div>
      <p class="detail__content">{{ post.content }}</p>

      <!-- コメント一覧は子コンポーネントに任せ、データだけ渡す -->
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
  margin-bottom: 16px;
}

.detail__title {
  font-size: 22px;
  margin: 10px 0;
}

.detail__meta {
  margin-bottom: 16px;
}

.detail__content {
  white-space: pre-wrap;
}
</style>
