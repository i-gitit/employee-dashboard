import { useQuery } from '@tanstack/react-query';
import { fetchEmployeeById } from '../services/employeeService';

export const useEmployeeDetail = (id: string) => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => fetchEmployeeById(id),
    enabled: !!id,
  });
};
