import React, { ReactNode } from 'react';
import ImageBlock from '../components/ImageBlock';

interface Block {
  name: string;
  attributes: Record<string, any>;
  innerBlocks?: Block[];
}

interface ParsedContent {
  content: ReactNode[];
  toc: { id: string; title: string; level: number }[];
}

export function parseBlocks(blocks: Block[]): ParsedContent {
  const content: ReactNode[] = [];
  const toc: { id: string; title: string; level: number }[] = [];

  blocks.forEach((block, index) => {
    switch (block.name) {
      case 'core/paragraph':
        content.push(<p key={index} dangerouslySetInnerHTML={{ __html: block.attributes.content }} />);
        break;
      case 'core/heading':
        const HeadingTag = `h${block.attributes.level}` as keyof JSX.IntrinsicElements;
        const headingId = `heading-${index}`;
        content.push(
          <HeadingTag key={index} id={headingId} dangerouslySetInnerHTML={{ __html: block.attributes.content }} />
        );
        toc.push({ id: headingId, title: block.attributes.content, level: block.attributes.level });
        break;
      case 'core/image':
        content.push(
          <ImageBlock
            key={index}
            src={block.attributes.url}
            alt={block.attributes.alt || ''}
            width={block.attributes.width}
            height={block.attributes.height}
          />
        );
        break;
      // Add cases for other block types as needed
      default:
        console.log(`Unhandled block type: ${block.name}`);
        break;
    }
  });

  return { content, toc };
}