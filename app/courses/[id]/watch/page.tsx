import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  getCourseById,
  getVideoById,
  getNextVideo,
} from "@/lib/data/courses";
import SectionList from "@/components/SectionList";
import VideoContent from "./VideoContent";

interface WatchPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ video?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: WatchPageProps): Promise<Metadata> {
  const { id: courseId } = await params;
  const { video: videoId } = await searchParams;

  const course = getCourseById(courseId);
  if (!course) {
    return {
      title: "コースが見つかりません",
    };
  }

  const videoData = videoId ? getVideoById(courseId, videoId) : null;
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

export default async function WatchPage({
  params,
  searchParams,
}: WatchPageProps) {
  const { id: courseId } = await params;
  const { video: videoId } = await searchParams;

  const course = getCourseById(courseId);
  if (!course) {
    notFound();
  }

  // 動画IDが指定されていない場合、最初の動画にリダイレクト
  if (!videoId) {
    const firstVideo = course.sections[0]?.videos[0];
    if (firstVideo) {
      redirect(`/courses/${courseId}/watch?video=${firstVideo.id}`);
    }
  }

  // 動画情報を取得
  const videoData = videoId ? getVideoById(courseId, videoId) : null;
  if (!videoData) {
    // 動画が見つからない場合、最初の動画にリダイレクト
    const firstVideo = course.sections[0]?.videos[0];
    if (firstVideo) {
      redirect(`/courses/${courseId}/watch?video=${firstVideo.id}`);
    }
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
