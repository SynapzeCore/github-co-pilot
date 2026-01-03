import { Github } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
            <Github className="h-4.5 w-4.5 text-background" />
          </div>
          <span className="text-base font-semibold tracking-tight">GitHub Agent</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-muted to-muted/60 shadow-subtle" />
        </div>
      </div>
    </header>
  );
}
