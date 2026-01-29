import { useParams, useNavigate } from 'react-router-dom';
import { useEmployeeDetail } from '../hooks/useEmployeeDetail';
import { EmployeeDetail } from '../components/EmployeeDetail';

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: employee, isLoading, isError } = useEmployeeDetail(id || '');

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <EmployeeDetail
        employee={employee}
        isLoading={isLoading}
        isError={isError}
        onBack={handleBack}
      />
    </div>
  );
};
