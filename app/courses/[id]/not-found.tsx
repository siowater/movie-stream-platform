import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          コースが見つかりません
        </h1>
        <p className="mb-8 text-gray-600">
          お探しのコースは存在しないか、削除された可能性があります。
        </p>
        <Button href="/">ホームに戻る</Button>
      </div>
    </div>
  );
}

