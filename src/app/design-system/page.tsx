import Button from '@/shared/components/button/Button';
import TextButton from '@/shared/components/button/TextButton';

function Page() {
  return (
    <div className="p-6 space-y-6">
      {/* 페이지 제목 */}
      <h1 className="text-2xl font-bold border-b pb-2">Design System</h1>

      {/* Form 영역 */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold pb-1">Form</h2>

        {/* Input */}
        <div className="flex flex-col gap-2 space-y-2">
          <h3 className="text-xl font-medium border-b pb-1">Input</h3>
          {/* 여기 컴포넌트 삽입 */}
        </div>

        {/* checkbox */}
        <div className="space-y-2">
          <h3 className="text-xl font-medium border-b pb-1">checkbox</h3>
          {/* 여기 컴포넌트 삽입 */}
        </div>

        {/* select */}
        <div className="space-y-2">
          <h3 className="text-xl font-medium border-b pb-1">select</h3>
          {/* 여기 컴포넌트 삽입 */}
        </div>
      </div>

      {/* Button */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-1">Button</h2>

        <div className="space-y-2">
          <h3 className="text-xl font-medium border-b pb-1">Button</h3>
          <Button type="button">버튼</Button>
          <Button variant="purple" type="button">
            Button
          </Button>
          <Button disabled>button</Button>
          <Button type="button" size="sm">
            버튼
          </Button>
          <Button type="button" size="sm" variant="purple">
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
        <h2 className="text-2xl font-semibold border-b pb-1">popup</h2>

        <div className="space-y-2">
          <h3 className="text-xl font-medium border-b pb-1">toast</h3>
          {/* 여기 컴포넌트 삽입 */}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-medium border-b pb-1">popup</h3>
          {/* 여기 컴포넌트 삽입 */}
        </div>
      </div>
    </div>
  );
}
export default Page;
