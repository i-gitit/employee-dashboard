import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from '../services/employeeService';


export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'] as const,
    queryFn: fetchEmployees,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


export type UseEmployeesResult = ReturnType<typeof useEmployees>;
