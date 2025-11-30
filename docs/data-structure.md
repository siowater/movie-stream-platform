# データ構造設計

## 概要
動画配信プラットフォームで使用するデータ構造の設計書です。

## データモデル

### Course（コース）
コース全体の情報を表すエンティティです。

```typescript
interface Course {
  id: string;                    // コースID（一意）
  title: string;                 // コースタイトル
  description: string;            // コース説明
  instructor: string;            // 講師名
  thumbnail: string;             // サムネイル画像URL
  sections: Section[];            // セクションの配列
  createdAt?: string;             // 作成日時（オプション）
  updatedAt?: string;             // 更新日時（オプション）
}
```

### Section（セクション）
コース内のセクションを表すエンティティです。Udemyのようにコースをセクションごとに分類します。

```typescript
interface Section {
  id: string;                    // セクションID（一意）
  courseId: string;              // 所属するコースID
  title: string;                 // セクションタイトル
  order: number;                 // セクションの順序
  videos: Video[];               // 動画の配列
}
```

### Video（動画）
個々の動画を表すエンティティです。YouTubeの埋め込み動画として実装します。

```typescript
interface Video {
  id: string;                    // 動画ID（一意）
  sectionId: string;             // 所属するセクションID
  title: string;                 // 動画タイトル
  description?: string;           // 動画説明（オプション）
  youtubeVideoId: string;        // YouTube動画ID（埋め込み用）
  duration?: number;              // 動画の長さ（秒）（オプション）
  order: number;                 // セクション内での順序
}
```

## データの階層構造

```
Course
├── Section 1
│   ├── Video 1
│   ├── Video 2
│   └── Video 3
├── Section 2
│   ├── Video 1
│   └── Video 2
└── Section 3
    └── Video 1
```

## モックデータの例

### コースデータの例

```typescript
const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Next.js完全入門",
    description: "Next.jsを使ったWebアプリケーション開発を学ぶコースです。",
    instructor: "山田太郎",
    thumbnail: "/images/course-1.jpg",
    sections: [
      {
        id: "section-1",
        courseId: "course-1",
        title: "イントロダクション",
        order: 1,
        videos: [
          {
            id: "video-1",
            sectionId: "section-1",
            title: "Next.jsとは",
            description: "Next.jsの概要を説明します。",
            youtubeVideoId: "dQw4w9WgXcQ",
            duration: 300,
            order: 1
          },
          {
            id: "video-2",
            sectionId: "section-1",
            title: "開発環境のセットアップ",
            description: "Next.jsの開発環境を構築します。",
            youtubeVideoId: "dQw4w9WgXcQ",
            duration: 600,
            order: 2
          }
        ]
      },
      {
        id: "section-2",
        courseId: "course-1",
        title: "基本的な使い方",
        order: 2,
        videos: [
          {
            id: "video-3",
            sectionId: "section-2",
            title: "ページの作成",
            description: "Next.jsでページを作成する方法を学びます。",
            youtubeVideoId: "dQw4w9WgXcQ",
            duration: 900,
            order: 1
          }
        ]
      }
    ]
  }
];
```

## データの保存方法（MVP）

### 初期実装
- **モックデータ**: TypeScriptの定数として定義
- **ファイル配置**: `app/data/mockData.ts` または `lib/data/courses.ts`

### 将来的な拡張
- データベース（PostgreSQL、MongoDBなど）への移行
- API経由でのデータ取得
- 認証機能追加時のユーザー固有データ管理

## 型定義ファイル

型定義は `types/index.ts` に配置します。

```typescript
// types/index.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  sections: Section[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Section {
  id: string;
  courseId: string;
  title: string;
  order: number;
  videos: Video[];
}

export interface Video {
  id: string;
  sectionId: string;
  title: string;
  description?: string;
  youtubeVideoId: string;
  duration?: number;
  order: number;
}
```

## データ取得の流れ

1. **コース一覧ページ**: すべてのコースを取得（Course[]）
2. **コース詳細ページ**: 特定のコースIDでコース情報を取得（Course）
3. **動画視聴ページ**: コースIDとセクションID、動画IDで動画情報を取得（Video）

## 注意事項

- YouTube動画IDは、YouTubeのURLから抽出する
  - 例: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`
- セクションと動画の順序は`order`フィールドで管理
- MVPでは視聴進捗の保存は行わない（将来的に実装）

