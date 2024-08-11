import { gql } from "@apollo/client";
import client from "../apollo-client";

// Define types (you might want to move these to a separate types file later)
interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  } | null;
  categories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  tags: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
}

interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        title
        excerpt
        slug
        date
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
    categories(first: 10) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

export async function getPosts(first: number, after?: string): Promise<{ posts: Post[], pageInfo: PageInfo, categories: Category[] }> {
  const { data } = await client.query({
    query: GET_POSTS,
    variables: { first, after },
  });
  
  // Filter out categories with no posts
  const nonEmptyCategories = data.categories.nodes.filter((category: Category) => category.count > 0);
  
  return { 
    posts: data.posts.nodes, 
    pageInfo: data.posts.pageInfo, 
    categories: nonEmptyCategories.slice(0, 5) // Limit to 5 categories
  };
}

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id, idType: SLUG) {
      id
      title
      content
      date
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
      comments(where: {status: "APPROVE"}) {
        nodes {
          id
          content
          date
          author {
            node {
              name
            }
          }
        }
      }
    }
  }
`;

export async function getPost(slug: string) {
  const { data } = await client.query({
    query: GET_POST,
    variables: { id: slug },
  });
  return data.post;
}