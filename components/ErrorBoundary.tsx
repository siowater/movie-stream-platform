"use client";

import { useEffect } from "react";
import Button from "./Button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // エラーをコンソールに記録
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          エラーが発生しました
        </h1>
        <p className="mb-8 text-gray-600">
          申し訳ございません。予期しないエラーが発生しました。
        </p>
        {error.message && (
          <p className="mb-8 text-sm text-gray-500">{error.message}</p>
        )}
        <div className="flex justify-center gap-4">
          <Button onClick={reset}>再試行</Button>
          <Button href="/" variant="secondary">
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  );
}

