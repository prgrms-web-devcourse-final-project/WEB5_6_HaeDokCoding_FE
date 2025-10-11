import { useRef, useState } from 'react';
import Category from './Category';
import FormTitle from './FormTitle';
import WriteForm from './WriteForm';
import CompleteBtn from './CompleteBtn';
import ImageSection from './image-upload/ImageSection';
import Tag from '../components/tag/Tag';
import { getApi } from '@/app/api/config/appConfig';
import { tabItem } from '../main/CommunityTab';
import { useToast } from '@/shared/hook/useToast';
import { useRouter } from 'next/navigation';

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

export type UploadedItem = {
  file: File;
  url: string;
};

function WriteSection({ setIsOpen }: Props) {
  const formData = useRef<FormType>({
    categoryName: '',
    title: '',
    content: '',
    imageUrls: [],
    tags: [],
  });
  const [uploadedFile, setUploadedFile] = useState<UploadedItem[]>([]);

  const { toastError } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.current.title) {
      toastError('제목을 작성해주세요.');
      return;
    }
    if (!formData.current.content || formData.current.content === '') {
      toastError('내용을 작성해주세요.');
      return;
    }

    console.log(formData.current.categoryName);
    const categoryId = tabItem.findIndex((tab) => tab.label === formData.current.categoryName);

    if (categoryId === -1) {
      toastError('카테고리를 선택해주세요.');
      return;
    }
    const payload = new FormData();
    const postJson = {
      title: formData.current.title,
      content: formData.current.content,
      categoryId: categoryId,
      imageUrls: uploadedFile.map((file) => {
        console.log(file.url);
        return file.url;
      }),
    };
    console.log(postJson);
    console.log(JSON.stringify(postJson, null, 2));

    const postBlob = new Blob([JSON.stringify(postJson)], { type: 'application/json' });
    payload.append('post', postBlob);

    // uploadedFile.forEach((file) => {
    //   payload.append('files', file.url);
    // });

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
        router.push('/community');
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
        <FormTitle formData={formData} />
        <Category formData={formData} />
        <WriteForm formData={formData} />
      </section>
      <ImageSection
        formData={formData}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
      />
      <section className="mt-8">
        <Tag use="write" onClick={() => setIsOpen(true)} />
      </section>
    </form>
  );
}

export default WriteSection;
