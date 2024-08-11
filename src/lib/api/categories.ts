import { gql } from "@apollo/client";
import client from "../apollo-client";

interface Category {
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

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

export async function getCategories(): Promise<Category[]> {
  const { data } = await client.query({ query: GET_CATEGORIES });
  return data.categories.nodes;
}

const GET_CATEGORY_POSTS = gql`
  query GetCategoryPosts($slug: ID!) {
    category(id: $slug, idType: SLUG) {
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

export async function getCategoryPosts(slug: string): Promise<{ name: string, posts: Post[] }> {
  const { data } = await client.query({
    query: GET_CATEGORY_POSTS,
    variables: { slug },
  });
  return { name: data.category.name, posts: data.category.posts.nodes };
}