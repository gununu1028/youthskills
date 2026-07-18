# 2025年モジュール1解説

---


## 1. ファイル構成を確認する



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
index.html
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

