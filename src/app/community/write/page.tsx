'use client';

import Tag from '@/domains/community/components/tag/Tag';
import Category from '@/domains/community/write/Category';
import TagModal from '@/domains/community/write/cocktail-tag/TagModal';
import CompleteBtn from '@/domains/community/write/CompleteBtn';
import FormTitle from '@/domains/community/write/FormTitle';
import ImageSection from '@/domains/community/write/image-upload/ImageSection';
import WriteForm from '@/domains/community/write/WriteForm';
import StarBg from '@/domains/shared/components/star-bg/StarBg';
import { useState } from 'react';

function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-20 flex relative">
      <StarBg className="w-full h-32 absolute"></StarBg>
      <div className="page-layout max-w-824 flex-1 z-5">
        <CompleteBtn />
        <section>
          <FormTitle />
          <Category />
          <WriteForm />
        </section>
        <ImageSection />
        <section className="mt-8">
          <Tag use="write" onClick={() => setIsOpen(true)} />
        </section>
      </div>
      {isOpen && <TagModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Page;
