import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  // コース内の動画総数を計算
  const totalVideos = course.sections.reduce(
    (sum, section) => sum + section.videos.length,
    0
  );

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* サムネイル画像 */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
              <span className="text-2xl font-bold">
                {course.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* コース情報 */}
        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
          <p className="mb-2 text-sm text-gray-600">{course.instructor}</p>
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

