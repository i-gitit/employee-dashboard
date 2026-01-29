import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../hooks/useEmployees';
import { EmployeeTable, TableSkeleton } from '../components/EmployeeTable';
import { SearchBar } from '../components/SearchBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/button';
import { AlertCircle } from 'lucide-react';
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

  // const sortSearchFilterApplied = searchTerm || department !== 'all' || sortBy !== 'name' || sortOrder !== 'asc';
  const isDefaultFilters = !searchTerm && department === 'all' && sortBy === 'name' && sortOrder === 'asc';

// use isDefaultFilters instead of sortSearchFilterApplied

  // Get unique departments
  const departments = useMemo(() => {
    const depts = employees.map((emp) => emp.department);
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
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Employee Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage and view employee information
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-card border rounded-lg p-4">
            {/* Search */}
            <div className="flex-1 w-full">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by name, email..."
              />
            </div>

            {/* Department Filter */}
            <div className="min-w-full sm:min-w-40">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="min-w-full sm:min-w-40">
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as 'name' | 'joinDate' | 'department')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="joinDate">Sort by Join Date</SelectItem>
                  <SelectItem value="department">Sort by Department</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="min-w-full sm:min-w-40">
              <Select
                value={sortOrder}
                onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button */}
            {!isDefaultFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="self-start"
              >
                Reset
              </Button>
            )}
          </div>

          {/* Results Count */}
          {!isLoading && !isError && (
            <div className="text-sm text-muted-foreground">
              Showing {processedEmployees.length} of {employees.length} employees
            </div>
          )}

          {/* Employee Table */}
          {isLoading ? (
            <TableSkeleton />
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-lg font-semibold mb-2">Failed to load employees</h3>
              <p className="text-muted-foreground">
                There was an error loading the employee data. Please try again later.
              </p>
            </div>
          ) : processedEmployees.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <AlertCircle className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No employees found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <EmployeeTable
              employees={processedEmployees}
              onViewDetails={handleViewDetails}
            />
          )}
        </div>
      </main>
    </div>
  );
};
