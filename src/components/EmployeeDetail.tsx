import type { Employee } from '../types/employee';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { LeavesChart } from './LeavesChart';
import { 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Briefcase, 
  ArrowLeft,
  User
} from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface EmployeeDetailProps {
  employee: Employee | undefined;
  isLoading: boolean;
  isError: boolean;
  onBack: () => void;
}

export const EmployeeDetail = ({ 
  employee, 
  isLoading, 
  isError, 
  onBack 
}: EmployeeDetailProps) => {
  
  if (isLoading) {
    return <EmployeeDetailSkeleton />;
  }

  if (isError || !employee) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-destructive mb-4">⚠️</div>
          <h3 className="text-lg font-semibold mb-2">Employee Not Found</h3>
          <p className="text-muted-foreground">
            The employee you're looking for could not be found.
          </p>
        </div>
      </div>
    );
  }

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
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to List
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Employee Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{employee.name}</CardTitle>
                      <p className="text-lg text-muted-foreground">{employee.position}</p>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {employee.department}
                    </Badge>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Employee ID: {employee.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{employee.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{employee.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">
                    {employee.address.street}, {employee.address.city}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {employee.address.state} - {employee.address.zipCode}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p className="font-medium">{formatDate(employee.joinDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Leave Chart */}
        <div className="lg:col-span-1">
          <LeavesChart
            leavesAvailed={employee.leavesAvailed}
            leavesAvailable={employee.leavesAvailable}
          />
        </div>
      </div>
    </div>
  );
};

const EmployeeDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-32 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  );
};
