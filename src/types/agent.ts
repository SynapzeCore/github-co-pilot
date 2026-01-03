export type AgentAction = 'create_issue' | 'create_pr';

export interface ParsedData {
  repo: string;
  title: string;
  body: string;
  labels: string[];
  assignees: string[];
}

export interface AgentResponse {
  action: AgentAction;
  parsed_data: ParsedData;
  status: 'success' | 'error';
  message: string;
}

export interface ConversationMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  agentResponse?: AgentResponse;
}

export type AppState = 
  | 'idle' 
  | 'processing' 
  | 'preview' 
  | 'executing' 
  | 'success' 
  | 'error';
