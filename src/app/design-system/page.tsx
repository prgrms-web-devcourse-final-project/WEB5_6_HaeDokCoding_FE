'use client';

import Button from '@/shared/components/button/Button';
import TextButton from '@/shared/components/button/TextButton';
import Input from '@/shared/components/InputBox/Input';
import { useState } from 'react';
import { customToast } from '@/shared/components/toast/CustomToastUtils';
import ModalLayout from '@/shared/components/modalPop/ModalLayout';
import ConfirmPop from '@/shared/components/modalPop/ConfirmPop';
import ChatInput from '@/shared/components/InputBox/ChatInput';
import SelectBox from '@/shared/components/InputBox/SelectBox';
import LikeBtn from '@/shared/components/like/LikeBtn';

function Page() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 bg-primary">
      {/* 페이지 제목 */}
      <h1 className="text-2xl font-bold border-b pb-2">Design System</h1>

      {/* Form 영역 */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold pb-1">Form</h2>

        {/* Input */}
        <div className="flex flex-col gap-2 space-y-2">
          <h3 className="text-xl font-medium border-b pb-1">Input</h3>
          <Input placeholder="내용을 입력해주세요." id="test" />
          <Input placeholder="내용을 입력해주세요." id="test" variant="search" />
          <Input placeholder="칵테일을 검색해 보세요" id="test" variant="comment" />
          <Input placeholder="내용을 입력해주세요." id="test" size="lg" />
          <ChatInput placeholder="내용을 입력해주세요" id="test" />
        </div>

        {/* select */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium border-b pb-1">select</h3>
          <SelectBox option={['', '논알콜', '약한 도수', '중간 도수']} title="도수" />
        </div>
      </div>

      {/* Button */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold pb-1">Button</h2>

        <div className="space-y-2">
          <h3 className="text-lg font-medium border-b pb-1">Button</h3>
          <Button type="button">버튼</Button>
          <Button color="purple" type="button">
            Button
          </Button>
          <Button disabled>button</Button>
          <Button type="button" size="sm">
            버튼
          </Button>
          <Button type="button" size="sm" color="purple">
            버튼
          </Button>
          <Button size="sm" disabled>
            버튼
          </Button>

          <TextButton>텍스트 버튼</TextButton>
          <TextButton size="sm">텍스트 버튼</TextButton>
        </div>
      </div>

      {/* popup */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold pb-1">popup</h2>

        <div className="space-y-2">
          <h3 className="text-lg font-medium border-b pb-1">toast</h3>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-green-300 text-black rounded"
              onClick={() => customToast.success('성공 메시지')}
            >
              Success Toast
            </button>

            <button
              className="px-4 py-2 bg-yellow-100 text-black rounded"
              onClick={() => customToast.info('정보 메시지')}
            >
              Info Toast
            </button>

            <button
              className="px-4 py-2 bg-red-200 text-black rounded"
              onClick={() => customToast.error('오류 메시지')}
            >
              Error Toast
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium border-b pb-1">popup</h3>
          {/* 모달 열기 버튼 */}
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            기본 모달 열기
          </button>
          <button
            onClick={() => setConfirmOpen(true)}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            컨펌 모달 열기
          </button>

          <ModalLayout
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            title="제목"
            description="설명"
            buttons={
              <>
                <Button type="button">버튼</Button>
              </>
            }
          >
            <div>모달팝업 내용</div>
          </ModalLayout>

          <ConfirmPop
            open={isConfirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Confirm제목"
            description="설명"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold pb-1">Icons</h2>
        <div className="space-y-2">
          <h3 className="text-lg font-medium border-b pb-1">like</h3>
          <LikeBtn />
        </div>
      </div>
    </div>
  );
}
export default Page;
