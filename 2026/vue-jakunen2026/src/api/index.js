// 香川県民コミュニティサイト 投稿者向け管理画面 APIクライアント
const BASE_URL = 'https://youth.m5a.jp/api'

// 投稿一覧を取得する（GET /api/posts）
export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/posts`)
  if (!res.ok) throw new Error('投稿一覧の取得に失敗しました')
  return res.json()
}

// 投稿詳細を取得する（GET /api/posts/{id}）
export async function fetchPost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`)
  if (!res.ok) throw new Error('投稿の取得に失敗しました')
  return res.json()
}

// カテゴリ一覧を取得する（GET /api/categories）
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`)
  if (!res.ok) throw new Error('カテゴリの取得に失敗しました')
  return res.json()
}

// 投稿を作成する（POST /api/posts）
// 更新系APIはHTTPステータスコードで成否を判断する
export async function createPost(payload) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('投稿の作成に失敗しました')
  return res.json()
}
