import { JSDOM } from 'jsdom';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface ImageInfo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function parseHtmlContent(content: string): { parsedContent: string; toc: TocItem[]; images: ImageInfo[] } {
  const dom = new JSDOM(content);
  const document = dom.window.document;
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const toc: TocItem[] = [];
  const images: ImageInfo[] = [];

  headings.forEach((heading, index) => {
    const id = `heading-${index}`;
    heading.id = id;
    toc.push({
      id,
      title: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    });
  });

  document.querySelectorAll('img').forEach((img, index) => {
    const src = img.getAttribute('src') || '';
    const alt = img.getAttribute('alt') || '';
    const width = parseInt(img.getAttribute('width') || '0', 10) || 800;
    const height = parseInt(img.getAttribute('height') || '0', 10) || 600;

    images.push({ src, alt, width, height });

    // Replace img tag with a placeholder for LightboxImage
    const placeholder = document.createElement('lightbox-image');
    placeholder.setAttribute('data-index', index.toString());
    img.parentNode?.replaceChild(placeholder, img);
  });

  return {
    parsedContent: dom.serialize(),
    toc,
    images,
  };
}