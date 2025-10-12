import { useCallback, useEffect, useMemo, useState } from 'react';
import Category from './Category';
import FormTitle from './FormTitle';
import WriteForm from './WriteForm';
import CompleteBtn from './CompleteBtn';
import ImageSection from './image-upload/ImageSection';
import { getApi } from '@/app/api/config/appConfig';
import { tabItem } from '../main/CommunityTab';
import { useToast } from '@/shared/hook/useToast';
import { useRouter } from 'next/navigation';
import { ParamValue } from 'next/dist/server/request/params';
import CocktailTag from '../components/tag/CocktailTag';
import TagModal from './cocktail-tag/TagModal';
import { FormType, TagType, UploadedItem } from '@/domains/recipe/types/types';
import { fetchPostById } from '../api/fetchPost';
import { debounce } from '@/shared/utills/debounce';

type Props = {
  mode: 'create' | 'edit';
  postId?: ParamValue;
};

function WriteSection({ mode, postId }: Props) {
  const [formData, setFormData] = useState<FormType>({
    categoryName: '',
    title: '',
    content: '',
    imageUrls: [],
    tags: [],
  });

  const [uploadedFile, setUploadedFile] = useState<UploadedItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [tags, setTags] = useState<TagType[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { toastError } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (mode === 'edit' && postId) {
      (async () => {
        try {
          const data = await fetchPostById(postId);

          fetchTags();

          setFormData({
            categoryName: data.categoryName,
            title: data.title,
            content: data.content,
            imageUrls: data.imageUrls || [],
            tags: data.tags || [],
          });

          setUploadedFile(
            (data.imageUrls || []).map((url: string) => ({
              file: null,
              url,
            }))
          );
          setSelectedTags(data.tags || []);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [mode, postId]);

  useEffect(() => {
    // 변경사항이 있는 경우에만 setFormData 호출
    if (JSON.stringify(formData.tags) !== JSON.stringify(selectedTags)) {
      setFormData((prev) => ({
        ...prev,
        tags: selectedTags,
      }));
    }
  }, [selectedTags]);

  useEffect(() => {
    if (JSON.stringify(selectedTags) !== JSON.stringify(formData.tags)) {
      setSelectedTags(formData.tags);
    }
  }, [formData.tags]);

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
        console.log(file.file);
        return file.file;
      }),
      tags: formData.tags,
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

  const fetchTags = useCallback(
    async (v?: string) => {
      const keyword = v?.trim() ?? '';
      const body = {
        keyword,
        page: 0,
        size: 100,
      };
      try {
        const res = await fetch(`${getApi}/cocktails/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        setTags(data.data); // 서버에서 받은 필터링된 태그 목록 저장
      } catch (error) {
        console.error(error);
      } finally {
      }
    },
    [setTags]
  );

  const debouncedFetch = useMemo(() => debounce(fetchTags, 300), [fetchTags]);

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

      if (!res.ok) {
        toastError('글 수정에 실패했습니다.');
        return;
      }

      // console.log('글수정 성공', formData);
      router.push('/community');
    } catch (err) {
      console.error('글수정 폼 작성 에러', err);
      toastError('서버 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
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
          <CocktailTag
            use="write"
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            onClick={() => setIsOpen(true)}
          />
        </section>
      </form>
      {isOpen && (
        <TagModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          tags={tags}
          setTags={setTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          debouncedFetch={debouncedFetch}
        />
      )}
    </>
  );
}

export default WriteSection;
