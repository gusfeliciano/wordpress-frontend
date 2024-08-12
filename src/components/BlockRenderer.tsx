import React from 'react';
import Image from 'next/image';

interface BlockAttribute {
  name: string;
  value: any;
}

interface Block {
  name: string;
  attributes: BlockAttribute[];
  innerBlocks: Block[];
}

const BlockRenderer: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  const renderBlock = (block: Block) => {
    switch (block.name) {
      case 'core/paragraph':
        return <p dangerouslySetInnerHTML={{ __html: block.attributes.find(attr => attr.name === 'content')?.value }} />;
      case 'core/heading':
        const level = block.attributes.find(attr => attr.name === 'level')?.value || 2;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        return <HeadingTag dangerouslySetInnerHTML={{ __html: block.attributes.find(attr => attr.name === 'content')?.value }} />;
      case 'core/image':
        const src = block.attributes.find(attr => attr.name === 'url')?.value;
        const alt = block.attributes.find(attr => attr.name === 'alt')?.value || '';
        const width = block.attributes.find(attr => attr.name === 'width')?.value || 800;
        const height = block.attributes.find(attr => attr.name === 'height')?.value || 600;
        return (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{ width: '100%', height: 'auto' }}
          />
        );
      default:
        console.log(`Unhandled block type: ${block.name}`);
        return null;
    }
  };

  return (
    <>
      {blocks.map((block, index) => (
        <React.Fragment key={index}>
          {renderBlock(block)}
          {block.innerBlocks && <BlockRenderer blocks={block.innerBlocks} />}
        </React.Fragment>
      ))}
    </>
  );
};

export default BlockRenderer;