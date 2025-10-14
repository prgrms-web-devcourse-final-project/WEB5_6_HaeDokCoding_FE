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
import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';
import DetailSkeleton from '../detail/DetailSkeleton';

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
  const [editDone, setEditDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
              isNew: false,
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
    console.log(uploadedFile);
  }, [uploadedFile]);

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
      tags: formData.tags,
      imageUrls: uploadedFile
        .filter((item) => !item.isNew) // 기존 이미지 URL만
        .map((item) => item.url),
    };

    uploadedFile.forEach((file) => {
      console.log(file);
      if (file.file && file.isNew) {
        payload.append('images', file.file);
      }
    });

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

  // 실제 수정 처리만 담당 (이벤트 비의존)
  const handleEditLogic = async (): Promise<boolean> => {
    if (!postId) {
      toastError('게시글 ID가 없습니다.');
      return false; // 실패 시 false 반환
    }

    if (!formData.title.trim()) {
      toastError('제목을 작성해주세요.');
      return false;
    }

    if (!formData.content.trim()) {
      toastError('내용을 작성해주세요.');
      return false;
    }

    const categoryId = tabItem.findIndex((tab) => tab.label === formData.categoryName);
    if (categoryId === -1) {
      toastError('카테고리를 선택해주세요.');
      return false;
    }

    const postJson = {
      title: formData.title,
      content: formData.content,
      categoryId,
      tags: formData.tags,
      imageUrls: uploadedFile.filter((item) => !item.file && item.url).map((item) => item.url),
    };

    const payload = new FormData();
    console.log(postJson);

    uploadedFile.forEach(({ file }) => {
      if (file) payload.append('images', file); // 새로 업로드된 파일만
    });
    const postBlob = new Blob([JSON.stringify(postJson)], { type: 'application/json' });
    payload.append('post', postBlob);
    console.log(payload);

    try {
      setIsLoading(true);
      const res = await fetch(`${getApi}/posts/${postId}`, {
        method: 'PATCH',
        credentials: 'include',
        body: payload,
      });

      if (!res.ok) {
        toastError('글 수정에 실패했습니다.');
        return false;
      }

      setIsLoading(false);
      console.log('▶ 요청 보낸 후 status:', res.status);
      const text = await res.text();
      console.log('▶ 응답 텍스트:', text);
      return true;
    } catch (err) {
      console.error('글수정 폼 작성 에러', err);
      toastError('서버 요청 중 오류가 발생했습니다.');
      return false;
    }
  };

  // 폼 제출용 핸들러 (이벤트 객체 받아서 preventDefault 처리)
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (isLoading) <DetailSkeleton />;

  return (
    <>
      <form onSubmit={mode === 'create' ? handleSubmit : handleEditSubmit}>
        <CompleteBtn mode={mode} setEditDone={setEditDone} handleEditLogic={handleEditLogic} />
        <section>
          <FormTitle formData={formData} setFormData={setFormData} />
          <Category formData={formData} setFormData={setFormData} />
          <WriteForm formData={formData} setFormData={setFormData} />
        </section>
        <ImageSection uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
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
      {mode === 'edit' && editDone && (
        <ConfirmModal
          open={editDone}
          onClose={() => setEditDone(false)}
          onCancel={() => setEditDone(false)}
          onConfirm={async () => {
            setEditDone(false);
            await handleEditLogic();
            router.push(`/community/${postId}`);
          }}
          title="수정 완료"
        />
      )}
    </>
  );
}

export default WriteSection;
