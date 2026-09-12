import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchActiveBanner } from '../lib/api';
import type { Banner } from '../types';

// Renders nothing when there's no banner set - admin uploads one for a
// festival/sale and removes it when it's over, no code changes needed.
const PromoBanner: React.FC = () => {
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    fetchActiveBanner().then(setBanner);
  }, []);

  if (!banner) return null;

  const image = (
    <img
      src={banner.image}
      alt="Special offer"
      className="w-full h-auto object-cover"
      loading="eager"
    />
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="rounded-2xl overflow-hidden shadow-sm">
        {banner.linkUrl ? (
          banner.linkUrl.startsWith('/') ? (
            <Link to={banner.linkUrl}>{image}</Link>
          ) : (
            <a href={banner.linkUrl} target="_blank" rel="noreferrer">{image}</a>
          )
        ) : (
          image
        )}
      </div>
    </div>
  );
};

export default PromoBanner;
