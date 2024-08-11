import { gql } from "@apollo/client";
import client from "../apollo-client";

interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
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

export async function getTags(): Promise<Tag[]> {
  const { data } = await client.query({ query: GET_TAGS });
  return data.tags.nodes;
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

export async function getTagPosts(slug: string): Promise<{ name: string, posts: Post[] }> {
  const { data } = await client.query({
    query: GET_TAG_POSTS,
    variables: { slug },
  });
  return { name: data.tag.name, posts: data.tag.posts.nodes };
}