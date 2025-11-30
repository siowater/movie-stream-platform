"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Course, Video } from "@/types";

interface SectionListProps {
  course: Course;
  currentVideoId: string;
  courseId: string;
}

export default function SectionList({
  course,
  currentVideoId,
  courseId,
}: SectionListProps) {
  // 現在の動画が属するセクションIDを取得
  const currentSectionId = course.sections.find((section) =>
    section.videos.some((video) => video.id === currentVideoId)
  )?.id;

  // デフォルトで現在のセクションを展開
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(currentSectionId ? [currentSectionId] : [])
  );

  // currentVideoIdが変更されたときに、現在のセクションを展開状態にする
  useEffect(() => {
    if (currentSectionId) {
      setExpandedSections((prev) => {
        const newSet = new Set(prev);
        newSet.add(currentSectionId);
        return newSet;
      });
    }
  }, [currentVideoId, currentSectionId]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}`;
    }
    return `${minutes}`;
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="mb-4">
        <Link
          href={`/courses/${courseId}`}
          className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
        >
          ← コース詳細に戻る
        </Link>
        <h2 className="mt-2 text-lg font-bold text-gray-900">{course.title}</h2>
      </div>
      <div className="space-y-2">
        {course.sections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          const isCurrentSection = section.id === currentSectionId;

          return (
            <div key={section.id} className="border-b border-gray-200 pb-2">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors ${
                  isCurrentSection ? "text-blue-600" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{section.title}</span>
                  <span className="text-xs text-gray-500">
                    {isExpanded ? "−" : "+"}
                  </span>
                </div>
              </button>
              {isExpanded && (
                <ul className="mt-2 space-y-1">
                  {section.videos.map((video) => {
                    const isCurrentVideo = video.id === currentVideoId;
                    return (
                      <li key={video.id}>
                        <Link
                          href={`/courses/${courseId}/watch/${video.id}`}
                          className={`flex items-center gap-2 rounded px-2 py-1.5 text-sm transition-all duration-200 ${
                            isCurrentVideo
                              ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                              : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
                          }`}
                        >
                          <span className="flex h-5 w-5 items-center justify-center text-xs">
                            {isCurrentVideo ? "▶" : video.order}
                          </span>
                          <span className="flex-1">{video.title}</span>
                          {video.duration && (
                            <span className="text-xs text-gray-500">
                              {formatDuration(video.duration)}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

