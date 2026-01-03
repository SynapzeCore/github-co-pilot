import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { MessageInput } from '@/components/MessageInput';
import { UserMessage } from '@/components/UserMessage';
import { AgentMessage } from '@/components/AgentMessage';
import { PreviewCard } from '@/components/PreviewCard';
import { LoadingState } from '@/components/LoadingState';
import { ResultState } from '@/components/ResultState';
import { mockAgentRequest, mockExecuteAction } from '@/lib/mockAgent';
import { ConversationMessage, AppState, AgentResponse } from '@/types/agent';

const Index = () => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [appState, setAppState] = useState<AppState>('idle');
  const [currentResponse, setCurrentResponse] = useState<AgentResponse | null>(null);
  const [executionResult, setExecutionResult] = useState<{ success: boolean; url?: string; error?: string } | null>(null);

  const handleSubmit = useCallback(async (content: string) => {
    // Add user message
    const userMessage: ConversationMessage = {
      id: crypto.randomUUID(),
      type: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setAppState('processing');

    try {
      // Call mock agent
      const response = await mockAgentRequest(content);
      
      // Add agent response
      const agentMessage: ConversationMessage = {
        id: crypto.randomUUID(),
        type: 'agent',
        content: response.message,
        timestamp: new Date(),
        agentResponse: response,
      };
      setMessages(prev => [...prev, agentMessage]);
      setCurrentResponse(response);

      if (response.status === 'success') {
        setAppState('preview');
      } else {
        setAppState('error');
        setExecutionResult({ success: false, error: response.message });
      }
    } catch (error) {
      setAppState('error');
      setExecutionResult({ success: false, error: 'An unexpected error occurred' });
    }
  }, []);

  const handleConfirm = useCallback(async () => {
    setAppState('executing');
    
    try {
      const result = await mockExecuteAction();
      setExecutionResult(result);
      setAppState(result.success ? 'success' : 'error');
    } catch (error) {
      setExecutionResult({ success: false, error: 'Execution failed' });
      setAppState('error');
    }
  }, []);

  const handleEdit = useCallback(() => {
    setAppState('idle');
    setCurrentResponse(null);
    // Remove the last two messages (user + agent)
    setMessages(prev => prev.slice(0, -2));
  }, []);

  const handleReset = useCallback(() => {
    setMessages([]);
    setAppState('idle');
    setCurrentResponse(null);
    setExecutionResult(null);
  }, []);

  const isInputDisabled = appState !== 'idle' && appState !== 'error';

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
          
          {/* Empty state */}
          {messages.length === 0 && appState === 'idle' && (
            <div className="flex flex-1 flex-col items-center justify-center pb-20">
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-2xl font-semibold tracking-tight">What would you like to do?</h1>
                <p className="text-muted-foreground">Describe your task in natural language</p>
              </div>
              <div className="w-full max-w-xl">
                <MessageInput onSubmit={handleSubmit} disabled={isInputDisabled} />
              </div>
            </div>
          )}

          {/* Conversation thread */}
          {messages.length > 0 && (
            <div className="flex-1 space-y-4 pb-6">
              {messages.map((message) => (
                message.type === 'user' ? (
                  <UserMessage key={message.id} message={message} />
                ) : (
                  <AgentMessage key={message.id} message={message} />
                )
              ))}

              {/* Processing state */}
              {appState === 'processing' && (
                <LoadingState message="Analyzing your request…" />
              )}

              {/* Preview card */}
              {appState === 'preview' && currentResponse && (
                <PreviewCard
                  response={currentResponse}
                  onConfirm={handleConfirm}
                  onEdit={handleEdit}
                />
              )}

              {/* Executing state */}
              {appState === 'executing' && (
                <LoadingState message="Agent is working…" />
              )}

              {/* Result state */}
              {(appState === 'success' || appState === 'error') && executionResult && (
                <ResultState
                  success={executionResult.success}
                  message={executionResult.success ? 'Your request has been processed' : executionResult.error || 'Unknown error'}
                  url={executionResult.url}
                  onReset={handleReset}
                />
              )}
            </div>
          )}

          {/* Bottom input (when in conversation) */}
          {messages.length > 0 && appState === 'idle' && (
            <div className="sticky bottom-0 border-t border-border bg-background/80 py-4 backdrop-blur-xl">
              <MessageInput onSubmit={handleSubmit} disabled={isInputDisabled} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
