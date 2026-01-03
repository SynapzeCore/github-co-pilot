import { AgentResponse, AgentAction } from '@/types/agent';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Parse user intent from natural language
function parseIntent(prompt: string): { action: AgentAction; keywords: string[] } {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('pr') || lowerPrompt.includes('pull request') || lowerPrompt.includes('refactor')) {
    return { action: 'create_pr', keywords: extractKeywords(prompt) };
  }
  
  return { action: 'create_issue', keywords: extractKeywords(prompt) };
}

function extractKeywords(prompt: string): string[] {
  const keywords: string[] = [];
  
  if (prompt.toLowerCase().includes('bug')) keywords.push('bug');
  if (prompt.toLowerCase().includes('feature')) keywords.push('enhancement');
  if (prompt.toLowerCase().includes('urgent') || prompt.toLowerCase().includes('critical')) keywords.push('priority: high');
  if (prompt.toLowerCase().includes('docs') || prompt.toLowerCase().includes('documentation')) keywords.push('documentation');
  if (prompt.toLowerCase().includes('auth') || prompt.toLowerCase().includes('login')) keywords.push('auth');
  if (prompt.toLowerCase().includes('ui') || prompt.toLowerCase().includes('frontend')) keywords.push('frontend');
  if (prompt.toLowerCase().includes('api') || prompt.toLowerCase().includes('backend')) keywords.push('backend');
  
  return keywords.length > 0 ? keywords : ['needs-triage'];
}

function generateTitle(prompt: string, action: AgentAction): string {
  // Extract a meaningful title from the prompt
  const cleanPrompt = prompt.replace(/^(create|open|make|add|fix)\s+(a\s+)?(bug\s+)?(issue|pr|pull request)?\s*(for|that|to)?\s*/i, '');
  
  if (action === 'create_pr') {
    return cleanPrompt.charAt(0).toUpperCase() + cleanPrompt.slice(1, 60);
  }
  
  return cleanPrompt.charAt(0).toUpperCase() + cleanPrompt.slice(1, 60);
}

function generateBody(prompt: string, action: AgentAction): string {
  if (action === 'create_issue') {
    return `## Description

${prompt}

## Expected Behavior
_To be filled by the team_

## Current Behavior
_To be filled by the team_

## Steps to Reproduce
1. _Step 1_
2. _Step 2_

## Environment
- OS: _specify_
- Browser: _specify_
- Version: _specify_

---
_This issue was created by GitHub Agent_`;
  }
  
  return `## Summary

${prompt}

## Changes Made
- _List of changes_

## Testing
- [ ] Unit tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project guidelines
- [ ] Documentation updated
- [ ] No breaking changes

---
_This PR was created by GitHub Agent_`;
}

export async function mockAgentRequest(prompt: string): Promise<AgentResponse> {
  // Simulate processing time
  await delay(1500 + Math.random() * 1000);
  
  const { action, keywords } = parseIntent(prompt);
  
  // 10% chance of error for realism
  if (Math.random() < 0.1) {
    return {
      action,
      parsed_data: {
        repo: 'org/repo',
        title: '',
        body: '',
        labels: [],
        assignees: [],
      },
      status: 'error',
      message: 'Unable to parse repository from prompt. Please specify the target repository.',
    };
  }
  
  return {
    action,
    parsed_data: {
      repo: 'acme-corp/main-app',
      title: generateTitle(prompt, action),
      body: generateBody(prompt, action),
      labels: keywords,
      assignees: ['@team-lead'],
    },
    status: 'success',
    message: `Successfully parsed ${action === 'create_issue' ? 'issue' : 'pull request'} details`,
  };
}

export async function mockExecuteAction(): Promise<{ success: boolean; url?: string; error?: string }> {
  await delay(2000 + Math.random() * 1000);
  
  // 15% chance of execution failure
  if (Math.random() < 0.15) {
    const errors = [
      'Permission denied: You do not have write access to this repository',
      'Rate limit exceeded: Please wait before making more requests',
      'Invalid repository: The specified repository does not exist',
    ];
    return {
      success: false,
      error: errors[Math.floor(Math.random() * errors.length)],
    };
  }
  
  const issueNumber = Math.floor(Math.random() * 900) + 100;
  return {
    success: true,
    url: `https://github.com/acme-corp/main-app/issues/${issueNumber}`,
  };
}
