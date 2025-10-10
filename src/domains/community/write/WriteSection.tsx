import { useState } from 'react';
import Category from './Category';
import FormTitle from './FormTitle';
import WriteForm from './WriteForm';
import CompleteBtn from './CompleteBtn';
import ImageSection from './image-upload/ImageSection';
import Tag from '../components/tag/Tag';
import { getApi } from '@/app/api/config/appConfig';
import { tabItem } from '../main/CommunityTab';
import { useToast } from '@/shared/hook/useToast';

export type FormType = {
  categoryName: string;
  title: string;
  content: string;
  imageUrls: string[];
  tags: string[];
};

type Props = {
  setIsOpen: (value: boolean) => void;
};

function WriteSection({ setIsOpen }: Props) {
  const [formData, setFormData] = useState<FormType>({
    categoryName: '',
    title: '',
    content: '',
    imageUrls: [],
    tags: [],
  });

  const toastError = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryName) {
      toastError('카테고리를 선택해주세요');
    }

    const payload = new FormData();
    const postJson = {
      title: formData.title,
      content: formData.content,
      categoryId: tabItem.findIndex((tab) => (tab.key = formData.categoryName)) | 4,
    };

    const postBlob = new Blob([JSON.stringify(postJson)], { type: 'application/json' });
    payload.append('post', postBlob);

    try {
      const res = await fetch(`${getApi}/posts`, {
        method: 'POST',
        credentials: 'include',
        body: payload,
      });

      console.log('▶ 요청 보낸 후 status:', res.status);
      const text = await res.text();
      console.log('▶ 응답 텍스트:', text);
      if (res.ok) {
        console.log('글작성 성공', formData);
      }
    } catch (err) {
      console.error('글작성 폼 작성 에러', err);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CompleteBtn />
      <section>
        <FormTitle setFormData={setFormData} />
        <Category setFormData={setFormData} />
        <WriteForm setFormData={setFormData} />
      </section>
      <ImageSection />
      <section className="mt-8">
        <Tag use="write" onClick={() => setIsOpen(true)} />
      </section>
    </form>
  );
}

export default WriteSection;
