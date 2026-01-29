import type { Employee } from '../types/employee';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Mail, Calendar } from 'lucide-react';

interface EmployeeTableProps {
  employees: Employee[];
  onViewDetails: (id: string) => void;
}

export const EmployeeTable = ({ employees, onViewDetails }: EmployeeTableProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSkillPreview = (skills: string[]) => {
    if (skills.length === 0) return 'No skills';
    if (skills.length === 1) return skills[0];
    return `${skills[0]}, ${skills[1]}${skills.length > 2 ? ` +${skills.length - 2}` : ''}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
              Employee
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
              Position
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
              Department
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
              Join Date
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
              Skills
            </th>
            <th className="text-right py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-muted/50">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-muted/30 transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {employee.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="text-sm">
                  {employee.position}
                  <div className="text-xs text-muted-foreground">
                    {employee.address.city}, {employee.address.state}
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <Badge variant="secondary" className="text-xs">
                  {employee.department}
                </Badge>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(employee.joinDate)}
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {employee.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {employee.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{employee.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <Button 
                  onClick={() => onViewDetails(employee.id)}
                  size="sm" 
                  variant="outline"
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
