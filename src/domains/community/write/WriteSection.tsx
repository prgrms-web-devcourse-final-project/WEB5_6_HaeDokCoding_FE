import { useEffect, useRef, useState } from 'react';
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
import { ParamValue } from 'next/dist/server/request/params';

export type FormType = {
  categoryName: string;
  title: string;
  content: string;
  imageUrls: string[];
  tags: string[];
};

type Props = {
  mode: 'create' | 'edit';
  setIsOpen: (value: boolean) => void;
  postId?: ParamValue;
};

export type UploadedItem = {
  file: File;
  url: string;
};

function WriteSection({ mode, setIsOpen, postId }: Props) {
  const [formData, setFormData] = useState<FormType>({
    categoryName: '',
    title: '',
    content: '',
    imageUrls: [],
    tags: [],
  });
  const [uploadedFile, setUploadedFile] = useState<UploadedItem[]>([]);

  const { toastError } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (mode === 'edit' && postId) {
      (async () => {
        try {
          const res = await fetch(`${getApi}/posts/${postId}`, {
            method: 'GET',
            credentials: 'include',
          });
          if (!res.ok) {
            throw new Error('게시글 불러오기 실패');
          }
          const data = await res.json();

          // API에서 받아오는 데이터 구조에 맞게 매핑 필요
          setFormData({
            categoryName: data.data.categoryName,
            title: data.data.title,
            content: data.data.content,
            imageUrls: data.data.imageUrls || [],
            tags: data.data.tags || [],
          });

          // imageUrls가 있을 경우 uploadedFile 상태도 세팅
          setUploadedFile(
            (data.data.imageUrls || []).map((url: string) => ({
              file: null, // 실제 File은 없지만 url만 세팅 (필요시 수정)
              url,
            }))
          );

          // 필요하면 강제로 화면 갱신하기 위해 상태 하나 두고 set 하는 방법도 있음
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [mode, postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      toastError('제목을 작성해주세요.');
      return;
    }
    if (!formData.content || formData.content === '') {
      toastError('내용을 작성해주세요.');
      return;
    }

    console.log(formData.categoryName);
    const categoryId = tabItem.findIndex((tab) => tab.label === formData.categoryName);

    if (categoryId === -1) {
      toastError('카테고리를 선택해주세요.');
      return;
    }
    const payload = new FormData();
    const postJson = {
      title: formData.title,
      content: formData.content,
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

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postId) {
      toastError('게시글 ID가 없습니다.');
      return;
    }

    if (!formData.title.trim()) {
      toastError('제목을 작성해주세요.');
      return;
    }
    if (!formData.content.trim()) {
      toastError('내용을 작성해주세요.');
      return;
    }

    const categoryId = tabItem.findIndex((tab) => tab.label === formData.categoryName);
    if (categoryId === -1) {
      toastError('카테고리를 선택해주세요.');
      return;
    }

    const postJson = {
      title: formData.title,
      content: formData.content,
      categoryId,
      imageUrls: uploadedFile.map((file) => file.url),
      tags: formData.tags,
    };

    const payload = new FormData();
    const postBlob = new Blob([JSON.stringify(postJson)], { type: 'application/json' });
    payload.append('post', postBlob);

    try {
      const res = await fetch(`${getApi}/posts/${postId}`, {
        method: 'PATCH',
        credentials: 'include',
        body: payload,
      });

      const text = await res.text();
      console.log('▶ 응답 텍스트:', text);

      if (!res.ok) {
        toastError('글 수정에 실패했습니다.');
        return;
      }

      console.log('글수정 성공', formData);
      router.push('/community');
    } catch (err) {
      console.error('글수정 폼 작성 에러', err);
      toastError('서버 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={mode === 'create' ? handleSubmit : handleEdit}>
      <CompleteBtn mode={mode} />
      <section>
        <FormTitle formData={formData} setFormData={setFormData} />
        <Category formData={formData} setFormData={setFormData} />
        <WriteForm formData={formData} setFormData={setFormData} />
      </section>
      <ImageSection
        formData={formData}
        setFormData={setFormData}
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
