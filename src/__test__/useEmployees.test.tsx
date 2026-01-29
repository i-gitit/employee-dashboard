/// <reference types="vitest" />
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useEmployees } from '../hooks/useEmployees';
import { fetchEmployees } from '../services/employeeService';
import { MockEmployee } from '../test/utils';

// Mock the service
vi.mock('../services/employeeService', () => ({
  fetchEmployees: vi.fn(),
}));

// Mock data
const mockEmployees: MockEmployee[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@company.com',
    department: 'Engineering',
    position: 'Software Engineer',
    joinDate: '2022-03-15',
    skills: ['React', 'TypeScript'],
    leavesAvailed: 5,
    leavesAvailable: 15,
    address: {
      street: '123 MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
    },
    phone: '+91-9876543210',
  },
  {
    id: '2',
    name: 'Rahul Verma',
    email: 'rahul.verma@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    joinDate: '2021-06-10',
    skills: ['SEO', 'Analytics'],
    leavesAvailed: 12,
    leavesAvailable: 8,
    address: {
      street: '456 Connaught Place',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
    },
    phone: '+91-9876543211',
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useEmployees hook', () => {
  // Reset after each test
  afterEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('returns correct data on success', async () => {
    // Arrange
    vi.mocked(fetchEmployees).mockResolvedValue(mockEmployees);

    // Act
    const { result } = renderHook(() => useEmployees(), { wrapper });

    // Assert
    // Loading state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);

    // Wait for data to load
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockEmployees);
  });

  it('returns isError = true on error', async () => {
    // Arrange
    const errorMsg = 'Failed to fetch';
    vi.mocked(fetchEmployees).mockRejectedValue(new Error(errorMsg));

    // Act
    const { result } = renderHook(() => useEmployees(), { wrapper });

    // Assert
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(errorMsg);
  });

  it('does not refetch immediately after successful fetch', async () => {
    // Arrange
    vi.mocked(fetchEmployees).mockResolvedValue(mockEmployees);

    const { result } = renderHook(() => useEmployees(), { wrapper });

    // Wait for data
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Action: explicitly call refetch
    await result.current.refetch();

    // Assert: refetch was called once (initial + explicitly)
    expect(fetchEmployees).toHaveBeenCalledTimes(2);
  });

  it('calls fetchEmployees service exactly once per hook usage', async () => {
    // Arrange
    vi.mocked(fetchEmployees).mockResolvedValue(mockEmployees);

    // Act
    const { result, rerender } = renderHook(() => useEmployees(), { wrapper });

    // Wait for data
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Simulate re-render (no change in query key)
    rerender(undefined as any);
    await Promise.resolve(); // Let React reconcile

    // Assert: fetch called only once, not on every render
    expect(fetchEmployees).toHaveBeenCalledTimes(1);
  });
});
