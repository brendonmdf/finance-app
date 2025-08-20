'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, FileText, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationProps {
  activePage: 'dashboard' | 'transactions' | 'subscription';
}

export default function Navigation({ activePage }: NavigationProps) {
  const [selectedMonth, setSelectedMonth] = useState('Novembro');
  const { user, signOut } = useAuth();

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
          </div>
          <span className="text-xl font-bold text-foreground">finance.ai</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              activePage === 'dashboard'
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={`text-sm font-medium transition-colors ${
              activePage === 'transactions'
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Transações
          </Link>
          <Link
            href="/subscription"
            className={`text-sm font-medium transition-colors ${
              activePage === 'subscription'
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Assinatura
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* AI Report Button */}
          <Button variant="outline" className="bg-secondary hover:bg-secondary/80 border-border text-secondary-foreground">
            <FileText className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Relatório IA</span>
          </Button>

          {/* Month Selector */}
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-32 bg-secondary border-border text-secondary-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {months.map((month) => (
                <SelectItem key={month} value={month} className="text-foreground hover:bg-accent">
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  {user?.user_metadata?.full_name ? (
                    <span className="text-sm font-medium text-secondary-foreground">
                      {getUserInitials(user.user_metadata.full_name)}
                    </span>
                  ) : (
                    <User className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {user?.user_metadata?.full_name && (
                    <p className="font-medium text-sm">{user.user_metadata.full_name}</p>
                  )}
                  <p className="w-[200px] truncate text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
