import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "preact/hooks";

export interface QueryContextProps {
  children: React.ReactNode;
}

export default function QueryContext({ children }: QueryContextProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
