import React, { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

const LazyVideo: React.FC<Props> = ({ src, className, style }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [everMounted, setEverMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setEverMounted(true);
      },
      { rootMargin: '300px' }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (visible) video.play().catch(() => {});
    else video.pause();
  }, [visible]);

  return (
    <div ref={wrapperRef} className={className} style={style}>
      {everMounted && (
        <video
          ref={videoRef}
          src={src}
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
