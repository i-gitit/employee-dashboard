import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Filter, ArrowUpDown, X } from 'lucide-react';

interface FilterSortProps {
  department: string;
  sortBy: 'name' | 'joinDate' | 'department';
  sortOrder: 'asc' | 'desc';
  onDepartmentChange: (value: string) => void;
  onSortByChange: (value: 'name' | 'joinDate' | 'department') => void;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
  onReset: () => void;
  departments: string[];
}

export const FilterSort = ({
  department,
  sortBy,
  sortOrder,
  onDepartmentChange,
  onSortByChange,
  onSortOrderChange,
  onReset,
  departments,
}: FilterSortProps) => {
  const hasActiveFilters = department !== 'all' || sortBy !== 'name' || sortOrder !== 'asc';

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h3 className="font-semibold">Filter & Sort</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 px-2"
          >
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Department Filter */}
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={department} onValueChange={onDepartmentChange}>
            <SelectTrigger id="department">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label htmlFor="sortBy">Sort By</Label>
          <Select 
            value={sortBy} 
            onValueChange={(value) => onSortByChange(value as 'name' | 'joinDate' | 'department')}
          >
            <SelectTrigger id="sortBy">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="joinDate">Join Date</SelectItem>
              <SelectItem value="department">Department</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="space-y-2">
          <Label htmlFor="sortOrder">Order</Label>
          <Select 
            value={sortOrder} 
            onValueChange={(value) => onSortOrderChange(value as 'asc' | 'desc')}
          >
            <SelectTrigger id="sortOrder">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
