'use client';

import Back from '@/shared/assets/icons/back_36.svg';
import { useSaveScroll } from '../../hook/useSaveScroll';

function BackButton() {
  const { restoreAndGoBack } = useSaveScroll({
    storageKey: 'cocktail_list_scroll',
  });

  const handleBack = () => {
    restoreAndGoBack();
  };

  return (
    <button type="button" className="z-1" aria-label="뒤로가기" onClick={handleBack}>
      <Back />
    </button>
  );
}

export default BackButton;
