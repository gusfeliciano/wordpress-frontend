import Image from 'next/image'
import Link from 'next/link'
import { gql } from "@apollo/client";
import client from "../../lib/apollo-client";
import SearchBar from '../../components/SearchBar';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  } | null;
}

const SEARCH_POSTS = gql`
  query SearchPosts($searchTerm: String!) {
    posts(where: {search: $searchTerm}) {
      nodes {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

async function searchPosts(searchTerm: string): Promise<Post[]> {
  const { data } = await client.query({
    query: SEARCH_POSTS,
    variables: { searchTerm },
  });
  return data.posts.nodes;
}

export default async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const searchTerm = typeof searchParams.q === 'string' ? searchParams.q : '';
  const posts = await searchPosts(searchTerm);

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
          <SearchBar />
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-xl font-semibold mb-4">Results for "{searchTerm}"</h2>
          {posts.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: Post) => (
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
                      <h3 className="mt-4 text-lg font-medium text-gray-900">{post.title}</h3>
                      <div className="mt-2 text-base text-gray-500" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}