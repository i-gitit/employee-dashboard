import type { Employee } from '../types/employee';
import employeesData from '../data/employees.json';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchEmployees = async (): Promise<Employee[]> => {
  await delay(500); // Simulate network delay
  return employeesData as Employee[];
};

export const fetchEmployeeById = async (id: string): Promise<Employee> => {
  await delay(300);
  const employee = employeesData.find(emp => emp.id === id);
  
  if (!employee) {
    throw new Error('Employee not found');
  }
  
  return employee as Employee;
};
