# 2025年モジュール1解説

---


## 1. ファイル構成を確認する

実装前に、コンポーネント（部品）の地図を描きましょう。

```
App.vue（全体の枠・ヘッダー・500px中央寄せ）
└─ RouterView（URLに応じて中身が入れ替わる）
   ├─ HomeView（ホーム画面）
   │   ├─ PostFilters（検索・カテゴリ・並び替えのUI）
   │   └─ PostCard × 件数分（投稿1件のカード）
   ├─ PostDetailView（詳細画面）
   │   └─ CommentList（コメント一覧）
   └─ NewPostView（新規投稿フォーム）
```

ファイル構成はこうなります。

```
src/
├── main.js              … アプリの起動
├── App.vue              … 全体の枠
├── style.css            … 共通スタイル
├── router/index.js      … URL と画面の対応
├── api/index.js         … API呼び出しをまとめる
├── components/          … 使い回す部品
│   ├── PostCard.vue
│   ├── PostFilters.vue
│   └── CommentList.vue
└── views/               … 画面（ページ）
    ├── HomeView.vue
    ├── PostDetailView.vue
    └── NewPostView.vue
```

---

## 5. 実装する

各ファイルの完成版ソースはこちらです。
[`vue-jakunen2026/src/`](https://github.com/gununu1028/young-client/tree/master/2026/vue-jakunen2026/src)


### 5-0. まず必要なファイルを空で全部作る

```
src/
├── main.js
├── App.vue
├── style.css
├── api/
│   └── index.js
├── router/
│   └── index.js
├── components/
│   ├── PostCard.vue
│   ├── PostFilters.vue
│   └── CommentList.vue
└── views/
    ├── HomeView.vue
    ├── PostDetailView.vue
    └── NewPostView.vue
```



### 5-1. API層をまとめる（`src/api/index.js`）

サンプルコード：[`src/api/index.js`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/api/index.js)



### 5-2. ルーターで画面を切り替える（`src/router/index.js`）

URL と画面の対応表を作ります。

👉 サンプルコード：[`src/router/index.js`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/router/index.js)


### 5-3. 全体の枠（`src/App.vue` と `style.css`）

`App.vue` はヘッダーと本文の入れ物です。中身は `RouterView` が URL に応じて差し替えます。

👉 サンプルコード：[`src/App.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/App.vue) ／ [`src/style.css`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/style.css)

「横幅500px・中央寄せ」は CSS の `width: 500px` と `margin: 0 auto`（左右autoで中央寄せ）で実現します。

### 5-4. ホーム画面（`src/views/HomeView.vue`）


👉 サンプルコード：[`src/views/HomeView.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/views/HomeView.vue)



### 5-5. 検索フィルタの部品（`src/components/PostFilters.vue`）



👉 サンプルコード：[`src/components/PostFilters.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/components/PostFilters.vue)



### 5-6. 投稿カードの部品（`src/components/PostCard.vue`）



👉 サンプルコード：[`src/components/PostCard.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/components/PostCard.vue)


### 5-7. 投稿詳細画面（`src/views/PostDetailView.vue`）



👉 サンプルコード：[`src/views/PostDetailView.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/views/PostDetailView.vue)



### 5-8. コメント一覧の部品（`src/components/CommentList.vue`）



👉 サンプルコード：[`src/components/CommentList.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/components/CommentList.vue)

### 5-9. 新規投稿画面（`src/views/NewPostView.vue`）



👉 サンプルコード：[`src/views/NewPostView.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/views/NewPostView.vue)



---


