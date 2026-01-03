import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Agent is working…' }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-8 animate-fade-in">
      <div className="relative">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
      <span className="text-sm font-medium text-muted-foreground">{message}</span>
    </div>
  );
}
