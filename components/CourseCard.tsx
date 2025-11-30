import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types";
import { getFirstVideoId, getYouTubeThumbnail } from "@/lib/utils/youtube";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  // コース内の動画総数を計算
  const totalVideos = course.sections.reduce(
    (sum, section) => sum + section.videos.length,
    0
  );

  // コースの最初の動画IDからYouTubeサムネイルを取得
  const firstVideoId = getFirstVideoId(course);
  const thumbnailUrl = firstVideoId
    ? getYouTubeThumbnail(firstVideoId, "maxresdefault")
    : null;

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="group cursor-pointer overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-700">
        {/* サムネイル画像 */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-700">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white">
              <span className="text-4xl font-bold">
                {course.title.charAt(0)}
              </span>
            </div>
          )}
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* コース情報 */}
        <div className="p-6">
          <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {course.title}
          </h3>
          <p className="mb-3 text-sm text-gray-400">{course.instructor}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{course.sections.length}セクション</span>
            <span>•</span>
            <span>{totalVideos}動画</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

