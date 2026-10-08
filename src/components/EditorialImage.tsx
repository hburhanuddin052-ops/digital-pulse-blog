import React, { useState } from 'react';
import { CategoryName } from '../types/blog';

interface EditorialImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  category?: CategoryName;
  title?: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  webpSrc,
  alt,
  category,
  title,
  className = '',
  aspectClass = 'aspect-[16/10]',
  priority = false,
  width = 1200,
  height = 800,
}) => {
  const [hasError, setHasError] = useState(false);

  const resolvedWebp =
    webpSrc ||
    (src.startsWith('/images/') && src.endsWith('.jpg')
      ? `${src.slice(0, -4)}.webp`
      : undefined);

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-slate-900 text-slate-100 flex flex-col justify-between p-6 ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="text-xs font-mono tracking-wider text-blue-400">
          {category || 'Digital Pulse Editorial'}
        </div>
        <div className="max-w-md">
          <p className="text-base font-semibold tracking-tight text-white line-clamp-2">
            {title || alt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-neutral-100 dark:bg-slate-900 ${aspectClass} ${className}`}
    >
      <picture className="w-full h-full block">
        {resolvedWebp && <source srcSet={resolvedWebp} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </picture>
    </div>
  );
};
