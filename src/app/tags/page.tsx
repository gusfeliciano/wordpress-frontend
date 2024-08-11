import Link from 'next/link';
import { getTags } from '../../lib/api/tags';

export default async function Tags() {
  const tags = await getTags();

  return (
    <main className="min-h-screen bg-[#DCD5DC]">
      <header className="bg-[#1A385A] shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Tags</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <Link href={`/tag/${tag.slug}`} key={tag.id}>
                <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-[#1A385A] mr-2 mb-2 hover:bg-[#E46F44] hover:text-white transition-colors duration-200">
                  {tag.name} ({tag.count})
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}