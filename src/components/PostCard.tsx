import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
  title: string
  slug: string
  excerpt: string
  imageUrl: string
  category: string
}

const PostCard: React.FC<PostCardProps> = ({ title, slug, excerpt, imageUrl, category }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <Image src={imageUrl} alt={title} width={400} height={300} objectFit="cover" />
    <div className="p-4">
      <span className="text-sm text-[#E46F44] font-semibold">{category}</span>
      <Link href={`/post/${slug}`}>
        <h3 className="text-xl font-bold mt-2 mb-2 text-[#1A385A] hover:text-[#769ABE]">{title}</h3>
      </Link>
      <p className="text-gray-600 text-sm">{excerpt}</p>
    </div>
  </div>
)

export default PostCard