import { CheckCircle2, XCircle, ExternalLink, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultStateProps {
  success: boolean;
  message: string;
  url?: string;
  onReset: () => void;
}

export function ResultState({ success, message, url, onReset }: ResultStateProps) {
  return (
    <div className="animate-slide-up rounded-2xl border border-border bg-card p-6 text-center shadow-card">
      <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
        success ? 'bg-github-green/10' : 'bg-destructive/10'
      }`}>
        {success ? (
          <CheckCircle2 className="h-6 w-6 text-github-green" />
        ) : (
          <XCircle className="h-6 w-6 text-destructive" />
        )}
      </div>

      <h3 className={`mb-2 text-lg font-semibold ${success ? 'text-foreground' : 'text-destructive'}`}>
        {success ? 'Issue successfully created' : 'Action failed'}
      </h3>

      <p className="mb-5 text-sm text-muted-foreground">{message}</p>

      {success && url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {url}
        </a>
      )}

      <div className="pt-2">
        <Button onClick={onReset} variant="subtle" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Start New Request
        </Button>
      </div>
    </div>
  );
}
