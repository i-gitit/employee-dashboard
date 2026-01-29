export interface Employee {
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
  avatar?: string;
}

export interface EmployeeFilters {
  searchTerm: string;
  department: string;
  sortBy: 'name' | 'joinDate' | 'department';
  sortOrder: 'asc' | 'desc';
}
