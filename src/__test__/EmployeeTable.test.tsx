/// <reference types="vitest" />
import { renderWithProvider } from '../test/utils';
import { EmployeeTable } from '../components/EmployeeTable';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';


vi.mock('../hooks/useEmployees', () => ({
  useEmployees: vi.fn(),
}));

// Test data
const mockEmployees = [
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

// Mock function for onViewDetails
const mockOnViewDetails = vi.fn();

describe('EmployeeTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders desktop table with employees', () => {
    renderWithProvider(
      <div className="min-h-screen">
        <EmployeeTable employees={mockEmployees} onViewDetails={mockOnViewDetails} />
      </div>
    );

    // Desktop view
    const table = screen.getByRole('table', { hidden: true });
    expect(table).toBeInTheDocument();

    // Verify employees are in the table (use getAllByText since both desktop and mobile views exist)
    mockEmployees.forEach(emp => {
      expect(screen.getAllByText(emp.name)).toHaveLength(2); // Desktop + Mobile view
      expect(screen.getAllByText(emp.position)).toHaveLength(2);
      expect(screen.getAllByText(emp.department)).toHaveLength(2);
    });
  });

  it('renders mobile cards with employees', () => {
    // Mock window.matchMedia to pretend it's mobile
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false, // Pretend it's mobile
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });

    renderWithProvider(
      <div className="min-h-screen">
        <EmployeeTable employees={mockEmployees} onViewDetails={mockOnViewDetails} />
      </div>
    );

    // Mobile view (both desktop and mobile views exist in DOM)
    mockEmployees.forEach(emp => {
      expect(screen.getAllByText(emp.name)).toHaveLength(2); // Desktop + Mobile view
    });
  });

  it('does not render any employees when data is empty', () => {
    renderWithProvider(
      <div className="min-h-screen">
        <EmployeeTable employees={[]} onViewDetails={mockOnViewDetails} />
      </div>
    );

    mockEmployees.forEach(emp => {
      expect(screen.queryByText(emp.name)).not.toBeInTheDocument();
    });
  });

  it('calls onViewDetails when view details button is clicked', async () => {
    renderWithProvider(
      <div className="min-h-screen">
        <EmployeeTable employees={mockEmployees} onViewDetails={mockOnViewDetails} />
      </div>
    );

    const viewButtons = screen.getAllByRole('button', { name: /View Details/i });
    await userEvent.click(viewButtons[0]);

    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockEmployees[0].id);
  });
});
