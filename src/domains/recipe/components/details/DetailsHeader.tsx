'use client';
import Share from '@/domains/shared/components/share/Share';

import Keep from '@/domains/shared/components/keep/Keep';
import { useEffect, useState } from 'react';
import ShareModal from '@/domains/shared/components/share/ShareModal';
import { getApi } from '@/app/api/config/appConfig';
import BackBtn from './BackBtn';

interface Meta {
  title: string;
  imageUrl: string;
  url: string;
}

function DetailsHeader({ id, favor }: { id: number; favor: boolean | null }) {
  const [isShare, setIsShare] = useState(false);
  const [meta, setMeta] = useState<Meta | null>(null);

  const url = async () => {
    const res = await fetch(`${getApi}/cocktails/${id}/share`);
    const json = await res.json();
    setMeta(json.data);
  };

  useEffect(() => {
    url();
  }, []);

  return (
    <div className="flex items-center justify-between pb-5 sm:pb-12">
      {isShare && meta && (
        <ShareModal
          open={isShare}
          onClose={() => setIsShare(!isShare)}
          src={meta.imageUrl}
          title={meta.title}
          url={meta.url}
        />
      )}
      <BackBtn />
      <div className="flex items-center gap-3">
        <Share size="sm" onClick={() => setIsShare(true)} />
        <Keep cocktailId={id} favor={favor} />
      </div>
    </div>
  );
}
export default DetailsHeader;
