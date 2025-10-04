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
      <div className="max-w-1024 w-full flex flex-col gap-5">
        {messages.map((msg, i) => {
          const keyId = msg.id ?? `temp-${msg.sender}-${i}-${Date.now()}`;
          const prevMsg = messages[i - 1];
          const showProfile = !prevMsg || prevMsg.sender !== msg.sender;

          if (msg.sender === 'USER') {
            return <UserMessage key={keyId} message={msg.message} showProfile={showProfile} />;
          }

          const isTyping = msg.type === 'TYPING';

          return (
            <BotMessage
              key={keyId}
              messages={[
                {
                  id: msg.id,
                  message: msg.message,
                  type: msg.type ?? 'TEXT',
                  options: msg.type === 'RADIO_OPTIONS' ? (msg.stepData?.options ?? []) : [],
                  recommendations: getRecommendations(msg.type, msg.stepData),
                },
              ]}
              showProfile={showProfile}
              stepData={msg.stepData}
              currentStep={userCurrentStep}
              onSelectedOption={onSelectedOption}
              isTyping={isTyping}
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
