<script setup>
// 検索・カテゴリフィルタ・並び替えのUI。値は親コンポーネントとv-modelで双方向に同期する。
defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
})

const search = defineModel('search', { type: String, default: '' })
const categoryId = defineModel('categoryId', { default: 'all' })
const sort = defineModel('sort', { type: String, default: 'newest' })
</script>

<template>
  <div class="filters">
    <input
      v-model="search"
      type="search"
      class="input"
      placeholder="タイトル・内容で検索"
    />

    <div class="filters__row">
      <select v-model="categoryId" class="select" aria-label="カテゴリ">
        <option value="all">すべて</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>

      <select v-model="sort" class="select" aria-label="並び替え">
        <option value="newest">新着順</option>
        <option value="likes">いいね数順</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.filters__row {
  display: flex;
  gap: 10px;
}

.filters__row .select {
  flex: 1;
}
</style>
