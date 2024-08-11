import Image from 'next/image';
import { gql } from "@apollo/client";
import client from "../../../lib/apollo-client";
import Comments from '../../../components/Comments';

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id, idType: SLUG) {
      databaseId
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      comments {
        nodes {
          id
          content
          date
          author {
            node {
              name
            }
          }
          status
        }
      }
    }
  }
`;

async function getPost(slug: string) {
  const { data } = await client.query({
    query: GET_POST,
    variables: { id: slug },
  });
  return data.post;
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <article className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-4">{new Date(post.date).toLocaleDateString()}</p>
      {post.featuredImage?.node?.sourceUrl && (
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-auto mb-8"
        />
      )}
      <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
      <Comments comments={post.comments.nodes} postId={post.databaseId} />
    </article>
  );
}