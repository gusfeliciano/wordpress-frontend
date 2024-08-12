'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface LightboxImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const LightboxImage: React.FC<LightboxImageProps> = ({ src, alt, width, height }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
      />
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
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LightboxImage;