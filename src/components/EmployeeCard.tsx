import type { Employee } from '../types/employee';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Mail, Phone, Calendar, Briefcase } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onViewDetails: (id: string) => void;
}

export const EmployeeCard = ({ employee, onViewDetails }: EmployeeCardProps) => {
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

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.position}</p>
            </div>
          </div>
          <Badge variant="secondary">{employee.department}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span className="truncate">{employee.email}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{employee.phone}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Joined {formatDate(employee.joinDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          <span>{employee.address.city}, {employee.address.state}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 pt-2">
          {employee.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {employee.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{employee.skills.length - 3} more
            </Badge>
          )}
        </div>
        
        <Button 
          onClick={() => onViewDetails(employee.id)}
          className="w-full mt-4"
          variant="default"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
