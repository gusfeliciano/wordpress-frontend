import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar } from 'lucide-react'

interface FeaturedPostProps {
  title: string
  slug: string
  imageUrl: string
  location: string
  date: string
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ title, slug, imageUrl, location, date }) => (
  <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
    <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1A385A] to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6 text-white">
      <Link href={`/post/${slug}`}>
        <h2 className="text-3xl font-bold mb-2 hover:text-[#E8AA9B]">{title}</h2>
      </Link>
      <div className="flex items-center space-x-4 text-[#769ABE]">
        <span className="flex items-center"><MapPin size={16} className="mr-1" />{location}</span>
        <span className="flex items-center"><Calendar size={16} className="mr-1" />{date}</span>
      </div>
    </div>
  </div>
)

export default FeaturedPost