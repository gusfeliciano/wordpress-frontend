'use client'

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageBlockProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ src, alt, width, height }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative cursor-pointer" onClick={() => setIsOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          layout="responsive"
        />
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="max-w-4xl max-h-full p-4">
            <Image
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              layout="responsive"
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageBlock;