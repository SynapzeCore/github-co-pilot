import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSubmit, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="rounded-2xl border border-border bg-card p-1 shadow-card transition-shadow focus-within:shadow-elevated focus-within:ring-2 focus-within:ring-primary/20">
        <div className="flex items-end gap-2 p-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want the GitHub agent to do…"
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none bg-transparent px-2 py-2 text-base leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
          />
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || disabled}
            variant="apple"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Try: "Create a bug issue for login failure when token expires"
      </p>
    </div>
  );
}
