<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchCategories, createPost } from '../api'

const router = useRouter()
const categories = ref([])
const submitting = ref(false)

const form = reactive({
  title: '',
  content: '',
  author: '',
  category_id: '',
  image_url: '',
})

onMounted(async () => {
  categories.value = await fetchCategories()
})

// すべての必須項目が入力されているか
const isValid = computed(
  () =>
    form.title.trim() !== '' &&
    form.content.trim() !== '' &&
    form.author.trim() !== '' &&
    form.category_id !== '',
)

async function handleSubmit() {
  if (!isValid.value || submitting.value) return

  submitting.value = true
  try {
    await createPost({
      title: form.title,
      content: form.content,
      author: form.author,
      category_id: Number(form.category_id),
      image_url: form.image_url,
    })
    alert('投稿が作成されました')
    router.push('/')
  } catch (e) {
    alert(e.message)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="new-post">
    <button class="btn" @click="router.push('/')">← 戻る</button>
    <h1 class="new-post__title">新規投稿</h1>

    <form class="new-post__form" @submit.prevent="handleSubmit">
      <div class="field">
        <label class="field__label" for="title">
          投稿タイトル<span class="field__required">*</span>
        </label>
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
          <option value="" disabled>選択してください</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>

      <div class="field">
        <label class="field__label" for="image">画像URL（任意）</label>
        <input id="image" v-model="form.image_url" class="input" type="url" />
      </div>

      <button
        type="submit"
        class="btn btn--primary btn--block"
        :disabled="!isValid || submitting"
      >
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
