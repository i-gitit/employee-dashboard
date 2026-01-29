import type { Employee } from '../types/employee';

export const filterEmployees = (
  employees: Employee[],
  searchTerm: string,
  department: string
): Employee[] => {
  return employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      department === 'all' || employee.department === department;
    
    return matchesSearch && matchesDepartment;
  });
};
