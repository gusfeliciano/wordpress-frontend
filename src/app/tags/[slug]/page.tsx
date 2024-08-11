import Image from 'next/image';
import Link from 'next/link';
import { getTagPosts } from '../../../lib/api/tags';

export default async function TagPosts({ params }: { params: { slug: string } }) {
  const { name, posts } = await getTagPosts(params.slug);

  return (
    <main className="min-h-screen bg-[#DCD5DC]">
      <header className="bg-[#1A385A] shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Posts tagged with "{name}"</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link href={`/post/${post.slug}`} key={post.id}>
                <div className="bg-white overflow-hidden shadow rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="p-5">
                    <div className="flex-shrink-0">
                      {post.featuredImage?.node?.sourceUrl ? (
                        <Image
                          className="h-48 w-full object-cover"
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.title}
                          width={300}
                          height={200}
                        />
                      ) : (
                        <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image available</span>
                        </div>
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-[#1A385A]">{post.title}</h3>
                    <div className="mt-2 text-base text-[#769ABE]" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
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