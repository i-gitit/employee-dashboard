import type { Employee } from '../types/employee';

export const sortEmployees = (
  employees: Employee[],
  sortBy: 'name' | 'joinDate' | 'salary' | 'department',
  sortOrder: 'asc' | 'desc'
): Employee[] => {
  const sorted = [...employees].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'department':
        comparison = a.department.localeCompare(b.department);
        break;
      case 'joinDate':
        comparison = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
};
