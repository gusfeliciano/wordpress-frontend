import React from 'react';
import Link from 'next/link';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <nav className="toc bg-gray-100 p-4 mb-6 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Table of Contents</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 20}px` }}>
            <Link href={`#${item.id}`} className="text-blue-600 hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;