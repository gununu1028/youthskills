// アプリの起点となるファイル。ここからVueアプリが立ち上がる。
import { createApp } from 'vue' // Vueアプリを生成する関数
import './style.css' // 全体に適用するCSS
import App from './App.vue' // 一番外側の親コンポーネント
import { router } from './router' // 画面遷移（ルーティング）の設定

// Appコンポーネントを最上位としてアプリを作成
// +ルーター機能をアプリに組み込む（<RouterView>などが使えるようになる
// +index.html の <div id="app"> にアプリを描画する
createApp(App).use(router).mount('#app')
