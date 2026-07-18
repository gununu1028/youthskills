<!--
  NewPostView.vue … 新規投稿フォーム。入力内容をまとめてサーバーに送信する。
-->
<script setup>
// reactive … 複数の値をまとめて1つのオブジェクトとしてリアクティブに扱う（フォーム向き）
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchCategories, createPost } from '../api'

const router = useRouter()
const categories = ref([]) // カテゴリ選択肢
const submitting = ref(false) // 送信中フラグ（二重送信を防ぐのに使う）

// フォームの入力値。各inputとv-modelで結びつける
const form = reactive({
  title: '',
  content: '',
  author: '',
  category_id: '',
  image_url: '',
})

// カテゴリの選択肢をサーバーから取得しておく
onMounted(async () => {
  categories.value = await fetchCategories()
})

// すべての必須項目が入力されているか。未入力があるとボタンを押せないようにする。
const isValid = computed(
  () =>
    form.title.trim() !== '' &&
    form.content.trim() !== '' &&
    form.author.trim() !== '' &&
    form.category_id !== '',
)

// 「投稿する」ボタンを押したときの処理
async function handleSubmit() {
  // 未入力がある、または送信中なら何もしない（ガード）
  if (!isValid.value || submitting.value) return

  submitting.value = true // ボタンを押せない状態にする
  try {
    await createPost({
      title: form.title,
      content: form.content,
      author: form.author,
      category_id: Number(form.category_id), // selectの値は文字列なので数値へ変換
      image_url: form.image_url,
    })
    alert('投稿が作成されました')
    router.push('/') // 成功したらトップへ戻る
  } catch (e) {
    alert(e.message) // 失敗したら理由を表示
  } finally {
    submitting.value = false // 送信中フラグを戻す
  }
}
</script>

<template>
  <div class="new-post">
    <button class="btn" @click="router.push('/')">← 戻る</button>
    <h1 class="new-post__title">新規投稿</h1>

    <!-- @submit.prevent … 送信時にページ再読み込み（標準動作）を止めて自分の処理を実行 -->
    <form class="new-post__form" @submit.prevent="handleSubmit">
      <div class="field">
        <label class="field__label" for="title">
          投稿タイトル<span class="field__required">*</span>
        </label>
        <!-- v-model で入力欄とform.titleを双方向に結びつける -->
        <input id="title" v-model="form.title" class="input" type="text" required />
      </div>

      <div class="field">
        <label class="field__label" for="content">
          投稿内容<span class="field__required">*</span>
        </label>
        <textarea id="content" v-model="form.content" class="textarea" required></textarea>
      </div>

      <div class="field">
        <label class="field__label" for="author">
          投稿者名<span class="field__required">*</span>
        </label>
        <input id="author" v-model="form.author" class="input" type="text" required />
      </div>

      <div class="field">
        <label class="field__label" for="category">
          カテゴリ<span class="field__required">*</span>
        </label>
        <select id="category" v-model="form.category_id" class="select" required>
          <!-- disabled の初期選択肢。プレースホルダー代わり -->
          <option value="" disabled>選択してください</option>
          <!-- 取得したカテゴリを選択肢として並べる -->
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>

      <div class="field">
        <label class="field__label" for="image">画像URL（任意）</label>
        <input id="image" v-model="form.image_url" class="input" type="url" />
      </div>

      <!-- :disabled で、未入力または送信中はボタンを押せないようにする -->
      <button
        type="submit"
        class="btn btn--primary btn--block"
        :disabled="!isValid || submitting"
      >
        <!-- 送信中はラベルを切り替える（三項演算子） -->
        {{ submitting ? '投稿中...' : '投稿する' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.new-post__title {
  font-size: 22px;
  margin: 16px 0 20px;
}
</style>
