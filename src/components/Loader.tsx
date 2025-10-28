import { Loader2 } from 'lucide-react';

interface LoaderProps {
  message?: string;
}

const Loader = ({ message = 'Loading...' }: LoaderProps) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default Loader;
