import Link from 'next/link'
import { getPosts } from '../lib/api/posts'
import SearchBar from '../components/SearchBar'
import FeaturedPost from '../components/FeaturedPost'
import PostCard from '../components/PostCard'
import { Tag } from 'lucide-react'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const pageSize = 6; // Number of posts per page

  const { posts, pageInfo, categories } = await getPosts(pageSize, page > 1 ? `${(page - 1) * pageSize - 1}` : undefined);

  return (
    <main className="min-h-screen bg-[#DCD5DC]">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-[#1A385A]">Discover Your Next Adventure</h2>
            <SearchBar />
          </div>

          {posts.length > 0 && (
            <section className="mb-12">
              <FeaturedPost
                title={posts[0].title}
                slug={posts[0].slug}
                imageUrl={posts[0].featuredImage?.node?.sourceUrl || '/placeholder-image.jpg'}
                location={posts[0].categories.nodes[0]?.name || 'Unknown Location'}
                date={new Date(posts[0].date).toLocaleDateString()}
              />
            </section>
          )}

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-[#1A385A]">Latest Travel Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  imageUrl={post.featuredImage?.node?.sourceUrl || '/placeholder-image.jpg'}
                  category={post.categories.nodes[0]?.name || 'Uncategorized'}
                />
              ))}
            </div>
          </section>

          <div className="mt-8 flex justify-between">
            {page > 1 && (
              <Link
                href={`/?page=${page - 1}`}
                className="bg-[#1A385A] text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-[#769ABE]"
              >
                Previous
              </Link>
            )}
            {pageInfo.hasNextPage && (
              <Link
                href={`/?page=${page + 1}`}
                className="bg-[#1A385A] text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-[#769ABE]"
              >
                Next
              </Link>
            )}
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-[#1A385A]">Explore by Category</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="bg-white px-4 py-2 rounded-full shadow-md text-[#E46F44] hover:bg-[#E46F44] hover:text-white transition duration-300"
                >
                  <Tag size={16} className="inline mr-2" />
                  {category.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}