import { GitPullRequest, CircleDot, Tag, User, GitBranch } from 'lucide-react';
import { ConversationMessage } from '@/types/agent';

interface AgentMessageProps {
  message: ConversationMessage;
}

export function AgentMessage({ message }: AgentMessageProps) {
  const response = message.agentResponse;
  
  if (!response) {
    return null;
  }

  const isIssue = response.action === 'create_issue';
  const ActionIcon = isIssue ? CircleDot : GitPullRequest;

  return (
    <div className="flex justify-start animate-slide-up">
      <div className="max-w-[90%] space-y-3">
        {/* Agent indicator */}
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
            <GitBranch className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">GitHub Agent</span>
        </div>

        {/* Main response card */}
        <div className="rounded-2xl rounded-tl-md border border-border bg-card p-4 shadow-card">
          {/* Detected action */}
          <div className="mb-4 flex items-center gap-2">
            <ActionIcon className={`h-4 w-4 ${isIssue ? 'text-github-green' : 'text-github-purple'}`} />
            <span className="text-sm font-medium">
              Detected Action: {isIssue ? 'Create GitHub Issue' : 'Create Pull Request'}
            </span>
          </div>

          {/* Parsed fields */}
          <div className="space-y-3">
            {/* Repository */}
            <div className="flex items-start gap-3">
              <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Repo
              </span>
              <span className="font-mono text-sm">{response.parsed_data.repo}</span>
            </div>

            {/* Title */}
            <div className="flex items-start gap-3">
              <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Title
              </span>
              <span className="text-sm font-medium">{response.parsed_data.title}</span>
            </div>

            {/* Labels */}
            {response.parsed_data.labels.length > 0 && (
              <div className="flex items-start gap-3">
                <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Labels
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {response.parsed_data.labels.map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium"
                    >
                      <Tag className="h-3 w-3" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Assignees */}
            {response.parsed_data.assignees.length > 0 && (
              <div className="flex items-start gap-3">
                <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Assignees
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {response.parsed_data.assignees.map((assignee) => (
                    <span
                      key={assignee}
                      className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium"
                    >
                      <User className="h-3 w-3" />
                      {assignee}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
