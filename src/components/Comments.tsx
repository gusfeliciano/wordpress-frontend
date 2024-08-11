'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  content: string;
  date: string;
  author: {
    node: {
      name: string;
    };
  };
  status: string;
}

interface CommentsProps {
  comments: Comment[];
  postId: number;
}

export default function Comments({ comments: initialComments, postId }: CommentsProps) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('Received postId:', postId);
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content: newComment,
          author,
          email,
        }),
      });

      const data = await response.json();

      if (response.status === 202 || (response.ok && data.status === 'hold')) {
        setMessage('Your comment is awaiting moderation.');
      } else if (response.ok) {
        setComments([...comments, data]);
        setNewComment('');
        setAuthor('');
        setEmail('');
        setMessage('Comment submitted successfully!');
      } else {
        throw new Error(data.error || 'Failed to submit comment');
      }
    } catch (error) {
      setMessage('Failed to submit comment. Please try again.');
      console.error('Comment submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.filter(comment => comment.status === 'approved').map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: comment.content }} />
          <p className="text-sm text-gray-500 mt-2">
            By {comment.author.node.name} on {new Date(comment.date).toLocaleDateString()}
          </p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="mt-6">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Your Email"
          required
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          rows={4}
          placeholder="Your Comment"
          required
        ></textarea>
        {message && <p className={`mb-2 ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </div>
  );
}