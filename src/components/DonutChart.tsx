'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
    percentage: number;
  }>;
}

export default function DonutChart({ data }: DonutChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card className="glass-card card-hover">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary/70 rounded-full"></div>
          Distribuição Financeira
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center space-x-8">
          {/* Chart */}
          <div className="w-36 h-36 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  className="drop-shadow-lg"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      className="hover:opacity-80 transition-opacity duration-300"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => 
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(value)
                  }
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Total</div>
                <div className="text-lg font-bold text-foreground">
                  {formatCurrency(data.reduce((sum, item) => sum + item.value, 0))}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors duration-300 group">
                <div 
                  className="w-4 h-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground group-hover:text-gradient transition-colors duration-300">
                    {item.name}
                  </span>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(item.value)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-foreground group-hover:text-gradient transition-colors duration-300">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
