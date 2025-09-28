import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, User, Globe } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';

const DashboardHeader: React.FC = () => {
  const { profile, signOut } = useAuth();

  const roleDashboards: UserRole[] = ['Engineering', 'HR', 'Legal', 'Finance', 'Maintenance', 'Operations'];

  const handleRoleNavigation = (role: string) => {
    window.location.href = `/dashboard/${role.toLowerCase()}`;
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <img 
              src="https://images.seeklogo.com/logo-png/45/1/kochi-metro-logo-png_seeklogo-459977.png"
              alt="Kochi Metro Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-foreground">IntelliDocs AI</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link 
              to="/dashboard" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/dashboard/feed" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Document Feed
            </Link>
            <Link 
              to="/dashboard/search" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Search Hub
            </Link>
            <Link 
              to="/dashboard/compliance" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Compliance Tracker
            </Link>
            {profile?.role === 'Admin' && (
              <Link 
                to="/dashboard/admin" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4" />
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Malayalam</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Role Dashboard Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Go to Dashboard <ChevronDown className="ml-2 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {roleDashboards.map((role) => (
                <DropdownMenuItem 
                  key={role}
                  onClick={() => handleRoleNavigation(role)}
                  className="cursor-pointer"
                >
                  {role} Dashboard
                </DropdownMenuItem>
              ))}
              {profile?.role === 'Admin' && (
                <DropdownMenuItem 
                  onClick={() => handleRoleNavigation('admin')}
                  className="cursor-pointer border-t"
                >
                  Admin Panel
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
                <span className="hidden md:inline ml-2">{profile?.full_name || profile?.email}</span>
                <ChevronDown className="ml-2 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="font-medium">{profile?.full_name || 'User'}</span>
                <span className="text-xs text-muted-foreground">{profile?.role}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;