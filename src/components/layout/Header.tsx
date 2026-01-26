import Link from 'next/link';

interface HeaderProps {
  minimal?: boolean;
}

export default function Header({ minimal = false }: HeaderProps) {
  return (
    <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          {/* Logo mark */}
          <div className="w-8 h-8 bg-[#1E3A5F] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          {/* Wordmark */}
          <span className="text-xl font-semibold text-gray-900 tracking-tight">
            Spurtly
          </span>
        </Link>

        {!minimal && (
          <nav className="flex items-center gap-6">
            <Link
              href="/campaign/new"
              className="
                px-5 py-2.5
                bg-[#1E3A5F] text-white
                text-sm font-medium
                rounded-lg
                hover:bg-[#152d4a] hover:shadow-lg hover:shadow-[#1E3A5F]/20
                transition-all duration-200
              "
            >
              Start Campaign
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
