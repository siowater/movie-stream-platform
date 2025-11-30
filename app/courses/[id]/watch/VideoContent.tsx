"use client";

import { useRouter } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import Button from "@/components/Button";
import { Video } from "@/types";

interface VideoContentProps {
  video: Video;
  courseId: string;
  nextVideo: Video | undefined;
}

export default function VideoContent({
  video,
  courseId,
  nextVideo,
}: VideoContentProps) {
  const router = useRouter();

  const handleVideoEnd = () => {
    if (nextVideo) {
      router.push(`/courses/${courseId}/watch?video=${nextVideo.id}`);
    }
  };

  return (
    <>
      {/* 動画プレーヤー */}
      <div className="mb-6 animate-fade-in-up">
        <VideoPlayer
          youtubeVideoId={video.youtubeVideoId}
          onEnd={handleVideoEnd}
        />
      </div>

      {/* 動画情報 */}
      <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "both", opacity: 0 }}>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          {video.title}
        </h1>
        {video.description && (
          <p className="text-gray-700">{video.description}</p>
        )}
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex gap-4">
        {nextVideo ? (
          <Button
            href={`/courses/${courseId}/watch?video=${nextVideo.id}`}
            size="lg"
          >
            次の動画へ →
          </Button>
        ) : (
          <div className="text-gray-500">
            これが最後の動画です。お疲れ様でした！
          </div>
        )}
      </div>
    </>
  );
}

