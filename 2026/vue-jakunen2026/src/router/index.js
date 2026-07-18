// URL（アドレス）と表示する画面（コンポーネント）の対応を決めるルーティング設定。
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetailView from '../views/PostDetailView.vue'
import NewPostView from '../views/NewPostView.vue'

// どのURLでどの画面を表示するかの一覧
const routes = [
  // トップ（投稿一覧）
  { path: '/', name: 'home', component: HomeView },
  // 新規投稿フォーム。「/posts/:id」より前に書くことで「new」がIDと誤認されるのを防ぐ
  { path: '/posts/new', name: 'post-new', component: NewPostView },
  // 投稿詳細。:id はURLの一部を変数として受け取る書き方。
  // props: true にすると、その :id をコンポーネントのpropsとして渡せる
  { path: '/posts/:id', name: 'post-detail', component: PostDetailView, props: true },
]

export const router = createRouter({
  // createWebHashHistory: URLに「#」が付く方式（例: /#/posts/1）。
  // サーバー側の設定が不要で、静的ホスティングでも動かしやすい
  history: createWebHashHistory(),
  routes,
  // 画面を切り替えるたびにスクロール位置を一番上へ戻す
  scrollBehavior() {
    return { top: 0 }
  },
})
