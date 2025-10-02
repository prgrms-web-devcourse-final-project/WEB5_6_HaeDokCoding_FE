import { ChatListProps } from '../types/recommend';
import BotMessage from './bot/BotMessage';
import NewMessageAlert from './bot/NewMessageAlert';
import TypingIndicator from './bot/TypingIndicator';
import UserMessage from './user/UserMessage';

function ChatList({
  messages,
  userCurrentStep,
  onSelectedOption,
  getRecommendations,
  chatListRef,
  chatEndRef,
  showNewMessageAlert,
  handleCheckBottom,
  handleScrollToBottom,
  isBotTyping,
}: ChatListProps) {
  return (
    <div
      ref={chatListRef}
      onScroll={handleCheckBottom}
      className="absolute top-0 left-0 right-0 bottom-20 w-full gap-5 px-3 pt-12 pb-5 flex flex-col items-center overflow-y-auto pr-2"
    >
      <div className="max-w-1024 w-full">
        {messages.map((msg, idx) => {
          const isLastMessage = idx === messages.length - 1;
          const showTyping = isLastMessage && msg.sender === 'CHATBOT' && isBotTyping;

          if (msg.sender === 'USER') {
            return <UserMessage key={`${msg.id}-${msg.sender}`} message={msg.message} />;
          }

          return (
            <BotMessage
              key={`${msg.id}-${msg.sender}`}
              messages={[
                {
                  id: msg.id,
                  message: msg.message,
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

        {isBotTyping && <TypingIndicator />}

        <div ref={chatEndRef}></div>
      </div>
      {showNewMessageAlert && <NewMessageAlert onClick={handleScrollToBottom} />}
    </div>
  );
}

export default ChatList;
