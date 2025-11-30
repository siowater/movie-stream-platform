// 型定義ファイル

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

