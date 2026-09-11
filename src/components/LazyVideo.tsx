import React, { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

const LazyVideo: React.FC<Props> = ({ src, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { rootMargin: '300px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <div ref={ref} className={className} style={style}>
      {inView && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default LazyVideo;
