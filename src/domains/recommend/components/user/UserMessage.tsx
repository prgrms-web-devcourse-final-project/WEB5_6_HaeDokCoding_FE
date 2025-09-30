interface Props {
  message: string;
}

// 메시지 (연속 메시지) 예시..
// const messages: Message[] = [
//   {
//     id: '1',
//     sender: 'user',
//     text: '냥냥냥글자가길어지면 어케될까요 너무너무너무 궁금해요 하하하하하하하하하하하하하하하하하하ㅏ',
//   },
//   { id: '2', sender: 'user', text: '배고파요' },
// ];

function UserMessage({ message }: Props) {
  return (
    <article aria-label="내 메시지" className="flex flex-col items-end">
      <header className="w-fit">
        <strong>나</strong>
      </header>

      {/* 메시지 그룹 */}
      <div className="flex flex-col items-end gap-3 mt-3 pr-3 max-w-[80%]">
        <div className="w-fit min-w-[120px] p-3 rounded-2xl rounded-tr-none bg-tertiary text-white">
          <p className="whitespace-pre-line">{message}</p>
        </div>
      </div>
    </article>
  );
}
export default UserMessage;
