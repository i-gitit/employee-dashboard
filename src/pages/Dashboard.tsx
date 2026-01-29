import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../hooks/useEmployees';
import { EmployeeList } from '../components/EmployeeList';
import { SearchBar } from '../components/SearchBar';
import { FilterSort } from '../components/FilterSort';
import { filterEmployees } from '../utils/filterEmployees';
import { sortEmployees } from '../utils/sortEmployees';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { data: employees = [], isLoading, isError } = useEmployees();

  // Filter and Sort State
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'joinDate' | 'department'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Get unique departments
  const departments = useMemo(() => {
    const depts = employees.map(emp => emp.department);
    return Array.from(new Set(depts)).sort();
  }, [employees]);

  // Filter and sort employees
  const processedEmployees = useMemo(() => {
    const filtered = filterEmployees(employees, searchTerm, department);
    return sortEmployees(filtered, sortBy, sortOrder);
  }, [employees, searchTerm, department, sortBy, sortOrder]);

  const handleViewDetails = (id: string) => {
    navigate(`/employee/${id}`);
  };

  const handleReset = () => {
    setSearchTerm('');
    setDepartment('all');
    setSortBy('name');
    setSortOrder('asc');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Employee Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage and view employee information
              </p>
            </div>
            {!isLoading && !isError && (
              <div className="text-right">
                <p className="text-2xl font-bold">{processedEmployees.length}</p>
                <p className="text-sm text-muted-foreground">
                  {processedEmployees.length === 1 ? 'Employee' : 'Employees'}
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Search Bar */}
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, email, or position..."
          />

          {/* Filter and Sort */}
          <FilterSort
            department={department}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onDepartmentChange={setDepartment}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
            onReset={handleReset}
            departments={departments}
          />

          {/* Results Count */}
          {!isLoading && !isError && (
            <div className="text-sm text-muted-foreground">
              Showing {processedEmployees.length} of {employees.length} employees
            </div>
          )}

          {/* Employee List */}
          <EmployeeList
            employees={processedEmployees}
            isLoading={isLoading}
            isError={isError}
            onViewDetails={handleViewDetails}
          />
        </div>
      </main>
    </div>
  );
};
