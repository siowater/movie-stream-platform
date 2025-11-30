import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
            <h1 className="text-xl font-bold text-white">
              動画配信プラットフォーム
            </h1>
          </Link>
          <nav className="hidden md:flex md:space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              ホーム
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

