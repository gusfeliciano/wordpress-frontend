import Image from 'next/image'
import Link from 'next/link'
import { gql } from "@apollo/client";
import client from "../lib/apollo-client";
import SearchBar from '../components/SearchBar';

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

interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
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
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

interface Tag {
  id: string;
  name: string;
  slug: string;
}

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
  categories: {
    nodes: Category[];
  };
  tags: {
    nodes: Tag[];
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

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
  categories: {
    nodes: Category[];
  };
}

async function getPosts(first: number, after?: string): Promise<{ posts: Post[], pageInfo: PageInfo }> {
  const { data } = await client.query({
    query: GET_POSTS,
    variables: { first, after },
  });
  return { posts: data.posts.nodes, pageInfo: data.posts.pageInfo };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const pageSize = 6; // Number of posts per page

  const { posts, pageInfo } = await getPosts(pageSize, page > 1 ? `${(page - 1) * pageSize - 1}` : undefined);

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Travel Adventures</h1>
          <SearchBar />
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
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

          <div className="mt-8 flex justify-between">
            {page > 1 && (
              <Link
                href={`/?page=${page - 1}`}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            {pageInfo.hasNextPage && (
              <Link
                href={`/?page=${page + 1}`}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}