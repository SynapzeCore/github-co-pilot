import { CircleDot, GitPullRequest, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgentResponse } from '@/types/agent';

interface PreviewCardProps {
  response: AgentResponse;
  onConfirm: () => void;
  onEdit: () => void;
  disabled?: boolean;
}

export function PreviewCard({ response, onConfirm, onEdit, disabled }: PreviewCardProps) {
  const isIssue = response.action === 'create_issue';
  const ActionIcon = isIssue ? CircleDot : GitPullRequest;

  return (
    <div className="animate-slide-up rounded-2xl border border-border bg-card p-5 shadow-elevated">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <ExternalLink className="h-4 w-4" />
        <span>This agent is about to create the following {isIssue ? 'GitHub Issue' : 'Pull Request'}</span>
      </div>

      {/* GitHub-style preview */}
      <div className="mb-5 rounded-xl border border-github-border bg-background p-4">
        <div className="flex items-start gap-3">
          <ActionIcon className={`mt-0.5 h-5 w-5 shrink-0 ${isIssue ? 'text-github-green' : 'text-github-purple'}`} />
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold leading-tight">{response.parsed_data.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {response.parsed_data.repo} #{Math.floor(Math.random() * 900) + 100}
            </p>
            
            {/* Markdown preview */}
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-foreground/80">
              <p className="font-medium">Description Preview:</p>
              <div className="rounded-lg bg-muted/50 p-3 font-mono text-xs leading-relaxed">
                {response.parsed_data.body.split('\n').slice(0, 6).map((line, i) => (
                  <div key={i} className={line.startsWith('#') ? 'font-semibold text-foreground' : ''}>
                    {line || '\u00A0'}
                  </div>
                ))}
                <div className="mt-1 text-muted-foreground">...</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button onClick={onConfirm} disabled={disabled} variant="apple" className="flex-1">
          Confirm & Execute
        </Button>
        <Button onClick={onEdit} disabled={disabled} variant="outline" className="flex-1">
          Edit Prompt
        </Button>
      </div>
    </div>
  );
}
