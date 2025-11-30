import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCourseById,
  getVideoById,
  getNextVideo,
  getAllCourses,
} from "@/lib/data/courses";
import SectionList from "@/components/SectionList";
import VideoContent from "../VideoContent";

interface WatchPageProps {
  params: Promise<{ id: string; videoId: string }>;
}

// 静的エクスポート用: すべてのコースと動画の組み合わせを生成
export async function generateStaticParams() {
  const courses = getAllCourses();
  const params: { id: string; videoId: string }[] = [];

  for (const course of courses) {
    for (const section of course.sections) {
      for (const video of section.videos) {
        params.push({
          id: course.id,
          videoId: video.id,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: WatchPageProps): Promise<Metadata> {
  const { id: courseId, videoId } = await params;

  const course = getCourseById(courseId);
  if (!course) {
    return {
      title: "コースが見つかりません",
    };
  }

  const videoData = getVideoById(courseId, videoId);
  const video = videoData?.video;

  if (video) {
    return {
      title: `${video.title} | ${course.title} | 動画配信プラットフォーム`,
      description: video.description || course.description,
    };
  }

  return {
    title: `${course.title} | 動画視聴 | 動画配信プラットフォーム`,
    description: course.description,
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id: courseId, videoId } = await params;

  const course = getCourseById(courseId);
  if (!course) {
    notFound();
  }

  // 動画情報を取得
  const videoData = getVideoById(courseId, videoId);
  if (!videoData) {
    notFound();
  }

  const { video } = videoData;
  const nextVideo = getNextVideo(courseId, video.id);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* セクションリスト（左サイドバー） */}
      <aside className="w-full border-r border-gray-200 bg-white p-4 lg:w-80 lg:overflow-y-auto">
        <SectionList
          course={course}
          currentVideoId={video.id}
          courseId={courseId}
        />
      </aside>

      {/* メインコンテンツエリア */}
      <main className="flex flex-1 flex-col overflow-y-auto bg-gray-50">
        <div className="mx-auto w-full max-w-5xl p-4 lg:p-8">
          <VideoContent
            key={video.id}
            video={video}
            courseId={courseId}
            nextVideo={nextVideo}
          />
        </div>
      </main>
    </div>
  );
}

