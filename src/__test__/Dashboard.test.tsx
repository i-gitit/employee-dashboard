/// <reference types="vitest" />
import { renderWithProvider, MockEmployee } from '../test/utils';
import { Dashboard } from '../pages/Dashboard';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEmployees, UseEmployeesResult } from '../hooks/useEmployees';
import { vi } from 'vitest';


vi.mock('../hooks/useEmployees', () => ({
  useEmployees: vi.fn(),
}));

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
  {
    id: '3',
    name: 'Ananya Patel',
    email: 'ananya.patel@company.com',
    department: 'Engineering',
    position: 'Frontend Developer',
    joinDate: '2023-01-20',
    skills: ['React', 'CSS'],
    leavesAvailed: 3,
    leavesAvailable: 17,
    address: {
      street: '789 SG Highway',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '380015',
    },
    phone: '+91-9876543212',
  },
];

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders employee list and shows correct count', async () => {
    vi.mocked(useEmployees).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      isError: false,
      isSuccess: true,
      isPending: false,
      isPlaceholderData: false,
      isRefetching: false,
      refetch: vi.fn(),
      remove: vi.fn(),
    } as unknown as UseEmployeesResult);

    renderWithProvider(<Dashboard />);

    expect(screen.getByText('Employee Dashboard')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Showing 3 of 3 employees')).toBeInTheDocument();
    });


    expect(screen.getAllByText('Priya Sharma')).toHaveLength(2);
    expect(screen.getAllByText('Rahul Verma')).toHaveLength(2);
    expect(screen.getAllByText('Ananya Patel')).toHaveLength(2);
  });

  it('shows loading state', () => {
    vi.mocked(useEmployees).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      isSuccess: false,
      isPending: true,
      isPlaceholderData: false,
      isRefetching: false,
      error: null,
      refetch: vi.fn(),
      remove: vi.fn(),
    } as unknown as UseEmployeesResult);

    renderWithProvider(<Dashboard />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('shows error state', () => {
    vi.mocked(useEmployees).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isSuccess: false,
      isPending: false,
      isPlaceholderData: false,
      isRefetching: false,
      error: new Error('API failed'),
      refetch: vi.fn(),
      remove: vi.fn(),
    } as unknown as UseEmployeesResult);

    renderWithProvider(<Dashboard />);

    expect(screen.getByText('Failed to load employees')).toBeInTheDocument();
  });

  it('filters employees by name', async () => {
    vi.mocked(useEmployees).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      isError: false,
      isSuccess: true,
      isPending: false,
      isPlaceholderData: false,
      isRefetching: false,
      refetch: vi.fn(),
      remove: vi.fn(),
    } as unknown as UseEmployeesResult);

    renderWithProvider(<Dashboard />);

    const search = screen.getByPlaceholderText('Search by name, email...');
    await userEvent.type(search, 'Priya');

    await waitFor(() => {
      expect(screen.getByText('Showing 1 of 3 employees')).toBeInTheDocument();
    });
    expect(screen.getAllByText('Priya Sharma')).toHaveLength(2); // Desktop + Mobile
    expect(screen.queryByText('Rahul Verma')).toBeNull();
  });

  it('displays employees in table format', async () => {
    vi.mocked(useEmployees).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      isError: false,
      isSuccess: true,
      isPending: false,
      isPlaceholderData: false,
      isRefetching: false,
      refetch: vi.fn(),
      remove: vi.fn(),
    } as unknown as UseEmployeesResult);

    renderWithProvider(<Dashboard />);

    // Check that table is rendered with correct structure
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Check that all employees are displayed (each appears twice due to desktop/mobile views)
    expect(screen.getAllByText('Priya Sharma')).toHaveLength(2);
    expect(screen.getAllByText('Rahul Verma')).toHaveLength(2);
    expect(screen.getAllByText('Ananya Patel')).toHaveLength(2);
  });
});
