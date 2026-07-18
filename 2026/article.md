# 2025年モジュール1解説

---


## 3. 画面と部品を設計する（得点源）

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

各ファイルの完成版ソースは GitHub に置いてあります → [`vue-jakunen2026/src/`](https://github.com/gununu1028/young-client/tree/master/2026/vue-jakunen2026/src)。
以下では各ファイルの**考え方とポイント**だけを説明し、実コードはリンク先を参照してください。

### 5-0. まず必要なファイルを空で全部作る

```
src/
├── main.js
├── App.vue
├── style.css
├── api/
│   └── index.js
├── router
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

これが揃ったら、5-1 から順に各ファイルの中身を書いていきましょう。

### 5-1. API層をまとめる（`src/api/index.js`）

API呼び出しを画面の中に直接書くと、同じ `fetch` があちこちに散らばります。
**1つのファイルにまとめる**と、URLの変更にも強く、テストもしやすくなります。

👉 完成コード：[`src/api/index.js`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/api/index.js)

ポイント：
- `res.ok`（200番台か）をチェックし、失敗なら例外を投げる
- POST では `Content-Type: application/json` と `JSON.stringify` を忘れない
- `fetchPosts()` のほか、`fetchPost(id)`・`fetchCategories()` も同じ形で用意する

### 5-2. ルーターで画面を切り替える（`src/router/index.js`）

URL と画面の対応表を作ります。

👉 完成コード：[`src/router/index.js`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/router/index.js)

> **注意点1**：`/posts/new` を `/posts/:id` より **上に書く**。
> 順番が逆だと `new` が「id = new」と解釈されてしまいます。

> **注意点2**：`createWebHashHistory`（URLに `#` が付く方式）を選んでいます。
> 提出先は静的なWebサーバーです。`#` を使わない方式だと、詳細ページで再読み込みしたときに
> サーバーがファイルを探して 404 になります。`#` 方式ならその心配がありません。

> **注意点3**：`props: true` を付けると、URLの `:id` を子コンポーネントに
> `props` として渡せます。

### 5-3. 全体の枠（`src/App.vue` と `style.css`）

`App.vue` はヘッダーと本文の入れ物です。中身は `RouterView` が URL に応じて差し替えます。

👉 完成コード：[`src/App.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/App.vue) ／ [`src/style.css`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/style.css)

「横幅500px・中央寄せ」は CSS の `width: 500px` と `margin: 0 auto`（左右autoで中央寄せ）で実現します。

### 5-4. ホーム画面（`src/views/HomeView.vue`）

いちばん作りごたえのある画面です。分解すると、

1. 画面を開いたら投稿一覧とカテゴリをAPIから取る
2. 検索・カテゴリ・並び順の「状態」を持つ
3. その状態から「表示する投稿」を計算する
4. 結果を `PostCard` で並べる。0件ならメッセージ

👉 完成コード：[`src/views/HomeView.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/views/HomeView.vue)

**ここが最重要ポイント**：`visiblePosts` を返す `computed` の中で、
①カテゴリ絞り込み → ②検索（タイトル・内容の部分一致）→ ③並び替え、を
順番に適用しています。こうすると検索とカテゴリと並び替えが自然に **組み合わさって** 動き、
「検索したら並び順が崩れる」といったバグが起きません。

テンプレート側では、状態が0件かどうかでメッセージを出し分けます。

- `v-for` で投稿を繰り返し表示。`:key` には一意な `id` を必ず指定
- `v-if / v-else-if / v-else` で「読み込み中」「0件」「一覧」を出し分け

### 5-5. 検索フィルタの部品（`src/components/PostFilters.vue`）

親から `v-model` で受け取り、親に返します。Vue 3.4以降の `defineModel` を使うと簡潔です。

👉 完成コード：[`src/components/PostFilters.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/components/PostFilters.vue)

- カテゴリは要件どおり **「すべて」を先頭に** 手動で追加し、その後にAPIのカテゴリを並べる
- `v-model="search"` により、入力と同時に親の `search` が変わる → **リアルタイム検索** が実現

### 5-6. 投稿カードの部品（`src/components/PostCard.vue`）

一覧の1件を表示する部品。クリックで詳細へ飛びます。

👉 完成コード：[`src/components/PostCard.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/components/PostCard.vue)

- `v-if="post.image_url"`：画像があるときだけ `<img>` を表示（無い投稿もある）
- いいねは `{{ post.likes }}` と **数字を表示するだけ**。ボタンにはしない（要件どおり）

### 5-7. 投稿詳細画面（`src/views/PostDetailView.vue`）

URLの `:id` を `props` で受け取り、その投稿を取得します。

👉 完成コード：[`src/views/PostDetailView.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/views/PostDetailView.vue)

- 「戻る」は `router.push('/')` を使う（要件：ライブラリの遷移メソッドで遷移）

### 5-8. コメント一覧の部品（`src/components/CommentList.vue`）

0件のときの分岐がポイントです。`v-if="comments.length === 0"` で「コメントがありません」を出し、
それ以外は `v-for` で一覧表示します。

👉 完成コード：[`src/components/CommentList.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/components/CommentList.vue)

### 5-9. 新規投稿画面（`src/views/NewPostView.vue`）

フォームには要件が細かく指定されています。1つずつ確実に。

- 必須：タイトル・内容・投稿者名・カテゴリ／任意：画像URL
- **最初は投稿ボタンを無効化**、必須が全部埋まったら有効化
- 送信中はボタンを無効化し、ラベルを「投稿中...」に
- 成功したらアラート「投稿が作成されました」→ ホームへ

👉 完成コード：[`src/views/NewPostView.vue`](https://github.com/gununu1028/young-client/blob/master/2026/vue-jakunen2026/src/views/NewPostView.vue)

**要件との対応表**：

| 要件 | 対応するコード |
|------|---------------|
| 必須項目チェック（HTML5） | `<input required>` |
| 全部埋まるまでボタン無効 | `:disabled="!isValid"` + `computed(isValid)` |
| 送信中はボタン無効・ラベル変更 | `submitting` フラグ + 三項演算子 |
| 成功でアラート→ホーム | `alert(...)` + `router.push('/')` |
| リロードでのページ更新を防ぐ | `@submit.prevent` |

---


