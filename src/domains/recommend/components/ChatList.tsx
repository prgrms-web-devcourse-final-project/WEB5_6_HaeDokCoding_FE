import { useChatScroll } from '../hook/useChatScroll';
import { ChatListProps } from '../types/recommend';
import BotMessage from './bot/BotMessage';
import NewMessageAlert from './bot/NewMessageAlert';
import UserMessage from './user/UserMessage';

function ChatList({
  messages,
  userCurrentStep,
  onSelectedOption,
  getRecommendations,
}: ChatListProps) {
  const { chatListRef, chatEndRef, showNewMessageAlert, handleCheckBottom, handleScrollToBottom } =
    useChatScroll(messages[messages.length - 1]?.id);

  return (
    <div
      ref={chatListRef}
      onScroll={handleCheckBottom}
      className="absolute top-0 left-0 bottom-18 sm:bottom-21 w-full gap-5 px-3 pt-12 pb-4 flex flex-col items-center overflow-y-auto pr-2"
    >
      <div className="max-w-1024 w-full">
        {messages.map((msg) => {
          if (msg.sender === 'USER') {
            return <UserMessage key={`${msg.id}-${msg.sender}`} message={msg.message} />;
          }

          return (
            <BotMessage
              key={`${msg.id}-${msg.sender}`}
              messages={[
                {
                  id: msg.id,
                  message: msg.type === 'TYPING' ? '' : msg.message,
                  type: msg.type ?? 'TEXT',
                  options: msg.type === 'RADIO_OPTIONS' ? (msg.stepData?.options ?? []) : [],
                  recommendations: getRecommendations(msg.type, msg.stepData),
                },
              ]}
              stepData={msg.stepData}
              currentStep={userCurrentStep}
              onSelectedOption={onSelectedOption}
            />
          );
        })}

        <div ref={chatEndRef}></div>
        {showNewMessageAlert && <NewMessageAlert onClick={handleScrollToBottom} />}
      </div>
    </div>
  );
}

export default ChatList;
