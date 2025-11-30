import type { Metadata } from "next";
import { getAllCourses } from "@/lib/data/courses";
import CourseCard from "@/components/CourseCard";

export const metadata: Metadata = {
  title: "コース一覧 | 動画配信プラットフォーム",
  description: "様々なコースから選んで学習を始めましょう",
};

export default function Home() {
  const courses = getAllCourses();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ページタイトル */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">コース一覧</h1>
        <p className="mt-2 text-gray-600">
          様々なコースから選んで学習を始めましょう
        </p>
      </div>

      {/* コースグリッド */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "both",
              }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-500">コースがありません</p>
        </div>
      )}
    </div>
  );
}
