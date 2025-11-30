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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* ページタイトル */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            コース一覧
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            様々なコースから選んで学習を始めましょう
          </p>
        </div>

        {/* コースグリッド */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
            <p className="text-gray-400">コースがありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
