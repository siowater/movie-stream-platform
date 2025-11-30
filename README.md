# 動画配信プラットフォーム

Udemy風の動画配信プラットフォームです。学生が講師が配信する動画を閲覧できるWebアプリケーションです。

## 機能

- 📚 **コース一覧**: 複数のコースを一覧表示
- 📖 **コース詳細**: コースの詳細情報とセクション一覧を表示
- 🎥 **動画視聴**: YouTube埋め込み動画の視聴
- 📑 **セクション管理**: セクションごとに動画を分類
- ⏭️ **自動遷移**: 動画終了時に次の動画へ自動遷移
- 📱 **レスポンシブ**: モバイル、タブレット、デスクトップに対応

## 技術スタック

- **Next.js 16.0.5** - Reactフレームワーク（App Router）
- **React 19.2.0** - UIライブラリ
- **TypeScript 5** - 型安全性
- **Tailwind CSS 4** - スタイリング
- **YouTube埋め込みAPI** - 動画再生

## セットアップ

### 必要な環境

- Node.js 18以上
- npm、yarn、pnpm、またはbun

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### ビルド

```bash
# 本番用ビルド
npm run build

# 本番サーバーの起動
npm start
```

## プロジェクト構造

```
movie-stream-platform/
├── app/                    # Next.js App Router
│   ├── courses/           # コース関連ページ
│   │   └── [id]/         # 動的ルート
│   ├── layout.tsx        # ルートレイアウト
│   ├── page.tsx          # トップページ
│   ├── loading.tsx       # ローディング状態
│   └── error.tsx         # エラーハンドリング
├── components/            # 再利用可能なコンポーネント
│   ├── Button.tsx
│   ├── CourseCard.tsx
│   ├── Header.tsx
│   ├── Loading.tsx
│   ├── SectionList.tsx
│   └── VideoPlayer.tsx
├── lib/                   # ユーティリティとデータ
│   └── data/
│       └── courses.ts    # モックデータ
├── types/                 # TypeScript型定義
│   └── index.ts
└── docs/                  # ドキュメント
    ├── requirement.md    # 要件定義
    ├── progress.md       # 進捗管理
    ├── tech-stack.md     # 技術スタック
    ├── data-structure.md # データ構造
    └── uiux-design.md    # UI/UXデザイン
```

## 主な機能の説明

### コース一覧ページ

- すべてのコースをカード形式で表示
- レスポンシブグリッドレイアウト（モバイル1列、タブレット2列、デスクトップ3列）
- ホバーエフェクトとアニメーション

### コース詳細ページ

- コースの詳細情報（タイトル、講師、説明）
- セクションと動画の一覧
- 「コースを見る」ボタンで動画視聴ページへ遷移

### 動画視聴ページ

- YouTube埋め込み動画の再生
- 左サイドバーにセクションリスト
- 現在視聴中の動画をハイライト
- 動画終了時に次の動画へ自動遷移
- 「次の動画へ」ボタンで手動遷移も可能

## 開発

### コード品質

```bash
# ESLintの実行
npm run lint
```

### ベストプラクティス

- Server Componentsを優先的に使用
- クライアント側のインタラクションが必要な場合のみ`'use client'`を使用
- TypeScriptで型安全性を確保
- Tailwind CSSでスタイリング

詳細は `.cursor/rules/project-rules.mdc` を参照してください。

## 今後の拡張予定

- 🔐 認証機能（ユーザー登録・ログイン）
- 💳 決済機能（有料コースの購入）
- 📊 視聴進捗の保存
- 🔍 コース検索機能
- ⭐ レビュー・評価機能

## ライセンス

このプロジェクトはデモ用です。

## ドキュメント

詳細なドキュメントは `docs/` ディレクトリを参照してください：

- [要件定義](./docs/requirement.md)
- [進捗管理](./docs/progress.md)
- [技術スタック](./docs/tech-stack.md)
- [データ構造](./docs/data-structure.md)
- [UI/UXデザイン](./docs/uiux-design.md)
