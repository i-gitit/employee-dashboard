import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

export const createWrapper = () => ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </MemoryRouter>
);

export const renderWithProvider = (ui: React.ReactElement): RenderResult =>
  render(ui, { wrapper: createWrapper() });

// Type for your mock data
export interface MockEmployee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  skills: string[];
  leavesAvailed: number;
  leavesAvailable: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
}
