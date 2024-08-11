import Image from 'next/image';
import { getPost } from '../../../lib/api/posts';
import Comments from '../../../components/Comments';
import Error from '../../../components/Error';

// Define interfaces for our data structures
interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

interface Comment {
  id: string;
  content: string;
  date: string;
  author: {
    node: {
      name: string;
    };
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
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
  comments: {
    nodes: Comment[];
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  try {
    const post: Post = await getPost(params.slug);

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
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {post.categories.nodes.map((category: Category) => (
              <span key={category.id} className="bg-gray-200 px-2 py-1 rounded">{category.name}</span>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.nodes.map((tag: Tag) => (
              <span key={tag.id} className="bg-gray-200 px-2 py-1 rounded">{tag.name}</span>
            ))}
          </div>
        </div>
        
        <Comments 
          comments={post.comments.nodes}
          postId={post.id} 
        />
      </article>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return <Error message="Failed to load the post. Please try again later." />;
  }
}