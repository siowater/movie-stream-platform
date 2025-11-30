"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  youtubeVideoId: string;
  onEnd?: () => void;
}

export default function VideoPlayer({
  youtubeVideoId,
  onEnd,
}: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onEndRef = useRef(onEnd);

  // onEndの参照を最新に保つ
  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    // YouTube Player APIを使用して動画終了を検知
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== "https://www.youtube.com" ||
        event.data === undefined
      ) {
        return;
      }

      // YouTube Player APIのイベント
      if (event.data.event === "onStateChange") {
        // 0: 終了, 1: 再生中, 2: 一時停止, 3: バッファリング中, 5: 先頭に移動
        if (event.data.info === 0 && onEndRef.current) {
          onEndRef.current();
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [youtubeVideoId]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg transition-all duration-300 hover:shadow-xl">
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute left-0 top-0 h-full w-full transition-opacity duration-300"
      />
    </div>
  );
}

