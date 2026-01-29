import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

interface LeavesChartProps {
  leavesAvailed: number;
  leavesAvailable: number;
}

export const LeavesChart = ({ leavesAvailed, leavesAvailable }: LeavesChartProps) => {
  const data = [
    { name: 'Leaves Availed', value: leavesAvailed, color: 'hsl(var(--destructive))' },
    { name: 'Leaves Available', value: leavesAvailable, color: 'hsl(var(--primary))' },
  ];

  const totalLeaves = leavesAvailed + leavesAvailable;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Balance</CardTitle>
        <CardDescription>
          Total Annual Leaves: {totalLeaves}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => 
                `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-destructive/10 rounded-lg">
            <p className="text-2xl font-bold text-destructive">{leavesAvailed}</p>
            <p className="text-sm text-muted-foreground">Leaves Availed</p>
          </div>
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <p className="text-2xl font-bold text-primary">{leavesAvailable}</p>
            <p className="text-sm text-muted-foreground">Leaves Available</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
