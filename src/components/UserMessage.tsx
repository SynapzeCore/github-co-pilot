import { ConversationMessage } from '@/types/agent';

interface UserMessageProps {
  message: ConversationMessage;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end animate-slide-up">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-primary-foreground shadow-subtle">
        <p className="text-[15px] leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}
