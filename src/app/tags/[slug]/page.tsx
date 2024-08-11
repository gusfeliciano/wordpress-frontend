import Image from 'next/image';
import Link from 'next/link';
import { gql } from "@apollo/client";
import client from "../../../lib/apollo-client";

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

interface Tag {
  name: string;
  posts: {
    nodes: Post[];
  };
}

const GET_TAG_POSTS = gql`
  query GetTagPosts($slug: ID!) {
    tag(id: $slug, idType: SLUG) {
      name
      posts {
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
  }
`;

async function getTagPosts(slug: string): Promise<Tag> {
  const { data } = await client.query({
    query: GET_TAG_POSTS,
    variables: { slug },
  });
  return data.tag;
}

export default async function TagPosts({ params }: { params: { slug: string } }) {
  const tag = await getTagPosts(params.slug);

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Posts tagged with "{tag.name}"</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tag.posts.nodes.map((post) => (
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
        </div>
      </div>
    </main>
  );
}