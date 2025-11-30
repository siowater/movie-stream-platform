import { Course, Video } from "@/types";

// モックデータ: コース一覧
export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Next.js完全入門",
    description:
      "Next.jsを使ったモダンなWebアプリケーション開発を学ぶコースです。App Router、Server Components、データフェッチングなど、Next.jsの主要機能を実践的に学習できます。",
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
            description: "Next.jsの概要と特徴について説明します。",
            youtubeVideoId: "Sklc_fQBmcs",
            duration: 300,
            order: 1,
          },
          {
            id: "video-2",
            sectionId: "section-1",
            title: "開発環境のセットアップ",
            description: "Next.jsの開発環境を構築する方法を学びます。",
            youtubeVideoId: "dQw4w9WgXcQ",
            duration: 600,
            order: 2,
          },
        ],
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
            youtubeVideoId: "jNQXAC9IVRw",
            duration: 900,
            order: 1,
          },
          {
            id: "video-4",
            sectionId: "section-2",
            title: "ルーティング",
            description: "Next.jsのApp Routerを使ったルーティングを学びます。",
            youtubeVideoId: "9bZkp7q19f0",
            duration: 750,
            order: 2,
          },
        ],
      },
      {
        id: "section-3",
        courseId: "course-1",
        title: "データフェッチング",
        order: 3,
        videos: [
          {
            id: "video-5",
            sectionId: "section-3",
            title: "Server Componentsでのデータ取得",
            description:
              "Server Componentsを使ってデータを取得する方法を学びます。",
            youtubeVideoId: "Sklc_fQBmcs",
            duration: 1200,
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: "course-2",
    title: "React基礎から応用まで",
    description:
      "Reactの基礎から応用まで、実践的なアプリケーション開発を通じて学習するコースです。Hooks、状態管理、パフォーマンス最適化などを学びます。",
    instructor: "佐藤花子",
    thumbnail: "/images/course-2.jpg",
    sections: [
      {
        id: "section-4",
        courseId: "course-2",
        title: "Reactの基礎",
        order: 1,
        videos: [
          {
            id: "video-6",
            sectionId: "section-4",
            title: "Reactとは",
            description: "Reactの概要と特徴について説明します。",
            youtubeVideoId: "dQw4w9WgXcQ",
            duration: 400,
            order: 1,
          },
          {
            id: "video-7",
            sectionId: "section-4",
            title: "コンポーネントの作成",
            description: "Reactコンポーネントの作成方法を学びます。",
            youtubeVideoId: "jNQXAC9IVRw",
            duration: 800,
            order: 2,
          },
        ],
      },
      {
        id: "section-5",
        courseId: "course-2",
        title: "Hooks",
        order: 2,
        videos: [
          {
            id: "video-8",
            sectionId: "section-5",
            title: "useStateとuseEffect",
            description: "基本的なHooksの使い方を学びます。",
            youtubeVideoId: "9bZkp7q19f0",
            duration: 1000,
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: "course-3",
    title: "TypeScript実践入門",
    description:
      "TypeScriptを使った型安全な開発を学ぶコースです。基本的な型から高度な型操作まで、実践的な例を通じて学習します。",
    instructor: "鈴木一郎",
    thumbnail: "/images/course-3.jpg",
    sections: [
      {
        id: "section-6",
        courseId: "course-3",
        title: "TypeScriptの基礎",
        order: 1,
        videos: [
          {
            id: "video-9",
            sectionId: "section-6",
            title: "TypeScriptとは",
            description: "TypeScriptの概要とメリットについて説明します。",
            youtubeVideoId: "dQw4w9WgXcQ",
            duration: 350,
            order: 1,
          },
          {
            id: "video-10",
            sectionId: "section-6",
            title: "基本的な型",
            description: "TypeScriptの基本的な型について学びます。",
            youtubeVideoId: "jNQXAC9IVRw",
            duration: 700,
            order: 2,
          },
        ],
      },
    ],
  },
];

// コースIDでコースを取得する関数
export function getCourseById(courseId: string): Course | undefined {
  return mockCourses.find((course) => course.id === courseId);
}

// すべてのコースを取得する関数
export function getAllCourses(): Course[] {
  return mockCourses;
}

// コース内の動画を取得する関数
export function getVideoById(
  courseId: string,
  videoId: string
): { course: Course; video: Video } | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;

  for (const section of course.sections) {
    const video = section.videos.find((v) => v.id === videoId);
    if (video) {
      return { course, video };
    }
  }

  return undefined;
}

// 次の動画を取得する関数
export function getNextVideo(
  courseId: string,
  currentVideoId: string
): Video | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;

  let found = false;
  for (const section of course.sections) {
    for (const video of section.videos) {
      if (found) return video;
      if (video.id === currentVideoId) found = true;
    }
  }

  return undefined;
}

