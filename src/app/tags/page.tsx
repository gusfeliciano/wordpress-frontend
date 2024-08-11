import Link from 'next/link';
import { gql } from "@apollo/client";
import client from "../../lib/apollo-client";

interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

const GET_TAGS = gql`
  query GetTags {
    tags {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

async function getTags(): Promise<Tag[]> {
  const { data } = await client.query({ query: GET_TAGS });
  return data.tags.nodes;
}

export default async function Tags() {
  const tags = await getTags();

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Tags</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <Link href={`/tag/${tag.slug}`} key={tag.id}>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300 transition-colors duration-200">
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