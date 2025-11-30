import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
            <h1 className="text-xl font-bold text-gray-900">
              動画配信プラットフォーム
            </h1>
          </Link>
          <nav className="hidden md:flex md:space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ホーム
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

