import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: string;
}

export default function MetricCard({ title, value, icon: Icon, color = 'text-primary' }: MetricCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getGradientClass = (color: string) => {
    if (color.includes('success')) return 'from-green-500/20 to-green-600/20';
    if (color.includes('error')) return 'from-red-500/20 to-red-600/20';
    if (color.includes('warning')) return 'from-yellow-500/20 to-yellow-600/20';
    return 'from-primary/20 to-primary/60/20';
  };

  return (
    <Card className="glass-card card-hover relative overflow-hidden group">
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradientClass(color)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-muted/80 transition-colors duration-300">
            <Icon className={`w-6 h-6 ${color} group-hover:scale-110 transition-transform duration-300`} />
          </div>
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">{title}</span>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <span className="text-2xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
          {formatCurrency(value)}
        </span>
      </CardContent>
    </Card>
  );
}
