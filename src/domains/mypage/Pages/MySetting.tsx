import TextButton from '@/shared/components/button/TextButton';
import ToggleBtn from '../components/ToggleBtn';
import Button from '@/shared/components/button/Button';

function MySetting() {
  return (
    <section className="flex flex-col h-80 md:h-100 lg:h-125 justify-between">
      <div>
        <div className="flex justify-between py-5 border-b-1 border-gray-light">
          <div className="text-lg">닉네임 : UserName</div>
          <TextButton>수정하기</TextButton>
        </div>
        <div className="flex justify-between py-5">
          <h2>알람설정</h2>
          <ToggleBtn></ToggleBtn>
        </div>
      </div>

      <div className="flex justify-between">
        <TextButton>회원탈퇴</TextButton>
        <div className="flex gap-2">
          <Button color="purple">취소</Button>
          <Button>변경상태 저장</Button>
        </div>
      </div>
    </section>
  );
}
export default MySetting;
