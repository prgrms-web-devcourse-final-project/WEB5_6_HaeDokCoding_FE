'use client';

import Back from '@/shared/assets/icons/back_36.svg';
import { useSaveScroll } from '../../hook/useSaveScroll';

function BackButton() {
 
  const { restoreAndGoBack } = useSaveScroll({
    storageKey: 'cocktail_list_scroll',
  });

  const handleBack = () => {
     console.log('뒤로가기 클릭');
     console.log('저장된 스크롤:', sessionStorage.getItem('cocktail_list_scroll'));
     console.log('저장된 URL:', sessionStorage.getItem('cocktail_list_scroll_url'));
     console.log('복원 플래그:', sessionStorage.getItem('cocktail_list_scroll_restore'));
     restoreAndGoBack()
  }
 

  return (
    <button type="button" className="z-1" aria-label="뒤로가기" onClick={handleBack}>
      <Back />
    </button>
  );
}

export default BackButton;
