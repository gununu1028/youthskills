<!--
  App.vue … アプリ全体の骨組み（レイアウト）。
  上部のヘッダーは常に表示し、中身の部分だけURLに応じて差し替える。
-->
<script setup>
// RouterLink … ページ再読み込みなしで画面を移動するリンク（<a>の代わり）
// RouterView … 現在のURLに対応する画面がここに差し込まれる
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <!-- タイトルをクリックするとトップ（'/'）に戻る -->
    <RouterLink to="/" class="app-header__title">かがわコミュニティ</RouterLink>
  </header>
  <main class="app-main">
    <!-- ここにHomeViewやPostDetailViewなど、各画面が表示される -->
    <RouterView />
  </main>
</template>
