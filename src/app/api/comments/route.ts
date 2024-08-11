import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { postId, content, author, email } = body;

  console.log('Received comment data:', { postId, content, author, email });

  if (typeof postId !== 'number' || isNaN(postId)) {
    console.error('Invalid postId:', postId);
    return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
  }

  const apiUrl = `${process.env.WORDPRESS_URL}/wp-json/wp/v2/comments`;
  const username = process.env.WORDPRESS_USERNAME;
  const password = process.env.WORDPRESS_API_TOKEN;
  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

  try {
    console.log('Attempting to submit comment to:', apiUrl);
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        post: postId,
        author_name: author,
        author_email: email,
        content,
      }),
    });

    const data = await response.json();
    console.log('WordPress API response:', data);

    if (!response.ok) {
      console.error('WordPress API responded with an error:', response.status, data);
      return NextResponse.json({ error: `WordPress API error: ${response.status} ${JSON.stringify(data)}` }, { status: response.status });
    }

    if (data.status === 'spam') {
      console.log('Comment marked as spam');
      return NextResponse.json({ message: 'Your comment is awaiting moderation.' }, { status: 202 });
    }

    console.log('Comment submitted successfully:', data);
    return NextResponse.json(data);
} catch (error: unknown) {
    console.error('Error submitting comment:', error);
    return NextResponse.json({ error: (error as Error).message || 'Failed to submit comment' }, { status: 500 });
  }
  
}