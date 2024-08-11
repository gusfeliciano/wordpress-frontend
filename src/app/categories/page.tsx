import Link from 'next/link';
import { getCategories } from '../../lib/api/categories';

export default async function Categories() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-[#DCD5DC]">
      <header className="bg-[#1A385A] shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Categories</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.id}>
                <div className="bg-white overflow-hidden shadow rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-[#1A385A]">{category.name}</h2>
                    <p className="mt-2 text-[#769ABE]">{category.count} posts</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}