import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from '../services/employeeService';

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
