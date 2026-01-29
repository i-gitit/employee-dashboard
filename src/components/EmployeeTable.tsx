import type { Employee } from '../types/employee';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Mail, Calendar } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface EmployeeTableProps {
  employees: Employee[];
  onViewDetails: (id: string) => void;
}

// Responsive Table Skeleton (matches both desktop and mobile)
export const TableSkeleton = () => (
  <>
    {/* Desktop skeleton */}
    <div className="hidden sm:block">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                <Skeleton className="h-4 w-20" />
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                <Skeleton className="h-4 w-16" />
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                <Skeleton className="h-4 w-20" />
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                <Skeleton className="h-4 w-16" />
              </th>
              <th className="text-right py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                <Skeleton className="h-4 w-12" />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, i) => (
              <tr key={i} className="border-b">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div>
                      <Skeleton className="h-5 w-28 mb-1" />
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="secondary" className="text-xs">
                    <Skeleton className="h-3 w-16" />
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <Skeleton className="h-8 w-20" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Mobile skeleton (card layout) */}
    <div className="sm:hidden">
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 bg-card"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="h-6 w-20 rounded-md bg-muted"></div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>

            <div className="mt-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

// Private helpers
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Mobile View (Card Mode)
const getMobileView = (props: EmployeeTableProps) => (
  <div className="space-y-4">
    {props.employees.map((employee) => (
      <div
        key={employee.id}
        className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{employee.name}</div>
              <div className="text-sm text-muted-foreground">{employee.position}</div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {employee.department}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{employee.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(employee.joinDate)}</span>
          </div>
        </div>

        <div className="mt-4">
          <Button onClick={() => props.onViewDetails(employee.id)} size="sm" className="w-full">
            View Details
          </Button>
        </div>
      </div>
    ))}
  </div>
);

// Desktop View (Table Mode)
const getDesktopView = (props: EmployeeTableProps) => (
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
          <th className="text-right py-3 px-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-muted/50">
        {props.employees.map((employee) => (
          <tr
            key={employee.id}
            className="hover:bg-muted/30 transition-colors data-[selected=true]:bg-primary/5"
          >
            {/* Employee Column */}
            <td className="py-3 px-4">
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {employee.email}
                  </div>
                </div>
              </div>
            </td>

            {/* Position Column */}
            <td className="py-3 px-4">
              <div className="text-sm">
                {employee.position}
                <div className="text-xs text-muted-foreground">
                  {employee.address.city}, {employee.address.state}
                </div>
              </div>
            </td>

            {/* Department Column */}
            <td className="py-3 px-4">
              <Badge variant="secondary" className="text-xs">
                {employee.department}
              </Badge>
            </td>

            {/* Join Date Column */}
            <td className="py-3 px-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDate(employee.joinDate)}
              </div>
            </td>

            {/* Actions Column */}
            <td className="py-3 px-4 text-right">
              <Button
                onClick={() => props.onViewDetails(employee.id)}
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

export const EmployeeTable = ({ employees, onViewDetails }: EmployeeTableProps) => {
  return (
    <>
      <div className="hidden sm:block">
        {getDesktopView({ employees, onViewDetails })}
      </div>
      <div className="sm:hidden">
        {getMobileView({ employees, onViewDetails })}
      </div>
    </>
  );
};
