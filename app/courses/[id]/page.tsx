import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourseById } from "@/lib/data/courses";
import { getFirstVideoId, getYouTubeThumbnail } from "@/lib/utils/youtube";
import Button from "@/components/Button";

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    return {
      title: "コースが見つかりません",
    };
  }

  return {
    title: `${course.title} | 動画配信プラットフォーム`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      type: "website",
    },
  };
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  // コース内の動画総数を計算
  const totalVideos = course.sections.reduce(
    (sum, section) => sum + section.videos.length,
    0
  );

  // 動画の総時間を計算（秒単位）
  const totalDuration = course.sections.reduce(
    (sum, section) =>
      sum +
      section.videos.reduce(
        (sectionSum, video) => sectionSum + (video.duration || 0),
        0
      ),
    0
  );

  // 時間をフォーマット（時間:分）
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}時間${minutes}分`;
    }
    return `${minutes}分`;
  };

  // 最初の動画IDを取得（「コースを見る」ボタンで使用）
  const firstVideoId =
    course.sections[0]?.videos[0]?.id || null;
  const watchUrl = firstVideoId
    ? `/courses/${course.id}/watch?video=${firstVideoId}`
    : `/courses/${course.id}/watch`;

  // YouTubeサムネイルを取得
  const firstVideoYouTubeId = getFirstVideoId(course);
  const thumbnailUrl = firstVideoYouTubeId
    ? getYouTubeThumbnail(firstVideoYouTubeId, "maxresdefault")
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* コースヘッダー */}
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          {/* サムネイル画像 */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-800 shadow-lg border border-gray-700">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white">
                <span className="text-4xl font-bold">
                  {course.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* コース情報 */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-2 text-3xl font-bold text-white">
              {course.title}
            </h1>
            <p className="mb-4 text-lg text-gray-300">{course.instructor}</p>
            <p className="mb-6 text-gray-300">{course.description}</p>

            {/* コース統計 */}
            <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-400">
              <span>{course.sections.length}セクション</span>
              <span>•</span>
              <span>{totalVideos}動画</span>
              {totalDuration > 0 && (
                <>
                  <span>•</span>
                  <span>{formatDuration(totalDuration)}</span>
                </>
              )}
            </div>

            {/* 「コースを見る」ボタン */}
            <Button href={watchUrl} size="lg" className="w-full md:w-auto">
              コースを見る
            </Button>
          </div>
        </div>

        {/* セクション一覧 */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-white">コース内容</h2>
          <div className="space-y-4">
            {course.sections.map((section, index) => (
              <div
                key={section.id}
                className="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:border-gray-600"
                style={{
                  animation: "fade-in-up 0.6s ease-out",
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                  opacity: 0,
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {section.title}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {section.videos.length}動画
                  </span>
                </div>
                <ul className="space-y-2">
                  {section.videos.map((video) => (
                    <li
                      key={video.id}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-xs font-medium text-gray-300">
                        {video.order}
                      </span>
                      <span className="flex-1">{video.title}</span>
                      {video.duration && (
                        <span className="text-sm text-gray-500">
                          {formatDuration(video.duration)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
