import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardHeader from '@/components/DashboardHeader';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { 
  Wrench, Users, Scale, DollarSign, Settings, Cog,
  FileText, AlertCircle, TrendingUp, Clock
} from 'lucide-react';

const RoleDashboard: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) return null;

  const roleConfig = {
    engineering: {
      title: 'Engineering Dashboard',
      icon: Wrench,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Technical specifications, project timelines, and engineering reports',
      stats: [
        { label: 'Active Projects', value: '12', trend: '+2' },
        { label: 'Technical Docs', value: '450', trend: '+25' },
        { label: 'Compliance Rate', value: '98%', trend: '+1%' },
        { label: 'Pending Reviews', value: '8', trend: '-3' },
      ]
    },
    hr: {
      title: 'HR Dashboard',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Employee records, policies, training materials, and HR compliance',
      stats: [
        { label: 'Total Employees', value: '247', trend: '+5' },
        { label: 'Policy Documents', value: '120', trend: '+8' },
        { label: 'Training Completed', value: '89%', trend: '+12%' },
        { label: 'Open Positions', value: '7', trend: '+2' },
      ]
    },
    legal: {
      title: 'Legal Dashboard',
      icon: Scale,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Legal documents, compliance tracking, contracts, and regulatory filings',
      stats: [
        { label: 'Legal Documents', value: '85', trend: '+3' },
        { label: 'Compliance Score', value: '99.2%', trend: '+0.5%' },
        { label: 'Active Contracts', value: '32', trend: '+1' },
        { label: 'Pending Reviews', value: '4', trend: '-2' },
      ]
    },
    finance: {
      title: 'Finance Dashboard',
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Financial reports, budget documents, audit trails, and expense tracking',
      stats: [
        { label: 'Budget Documents', value: '230', trend: '+15' },
        { label: 'Audit Compliance', value: '100%', trend: '0%' },
        { label: 'Monthly Reports', value: '24', trend: '+2' },
        { label: 'Pending Approvals', value: '6', trend: '-1' },
      ]
    },
    maintenance: {
      title: 'Maintenance Dashboard',
      icon: Settings,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Maintenance schedules, equipment logs, safety reports, and work orders',
      stats: [
        { label: 'Work Orders', value: '310', trend: '+20' },
        { label: 'Safety Reports', value: '156', trend: '+12' },
        { label: 'Equipment Status', value: '95%', trend: '+2%' },
        { label: 'Scheduled Tasks', value: '28', trend: '+5' },
      ]
    },
    operations: {
      title: 'Operations Dashboard',
      icon: Cog,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      description: 'Operational procedures, service schedules, performance metrics, and incident reports',
      stats: [
        { label: 'Service Reports', value: '180', trend: '+10' },
        { label: 'Performance Score', value: '97%', trend: '+3%' },
        { label: 'Incident Reports', value: '2', trend: '-5' },
        { label: 'Active Schedules', value: '15', trend: '+1' },
      ]
    },
    admin: {
      title: 'Admin Panel',
      icon: Cog,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      description: 'System administration, user management, and global settings',
      stats: [
        { label: 'Total Users', value: '89', trend: '+3' },
        { label: 'System Uptime', value: '99.9%', trend: '0%' },
        { label: 'Storage Used', value: '74%', trend: '+5%' },
        { label: 'Active Sessions', value: '42', trend: '+8' },
      ]
    }
  };

  const currentRole = role?.toLowerCase() as keyof typeof roleConfig;
  const config = roleConfig[currentRole];

  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Dashboard Not Found</h1>
            <p className="text-muted-foreground mt-2">The requested dashboard does not exist.</p>
          </div>
        </main>
      </div>
    );
  }

  // Check if user has access (Admin can access all, others only their role)
  const hasAccess = profile.role === 'Admin' || profile.role.toLowerCase() === currentRole;

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container py-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
            <p className="text-muted-foreground mt-2">
              You don't have permission to access this dashboard.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 rounded-lg ${config.bgColor} flex items-center justify-center`}>
              <Icon className={`h-6 w-6 ${config.color}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
              <p className="text-muted-foreground">{config.description}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {config.stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-600 font-medium">{stat.trend}</span>
                      {' '}from last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Recent Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium text-sm">Sample Document {item}</p>
                        <p className="text-xs text-muted-foreground">Updated 2 hours ago</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Processed
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Document Processing</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-muted rounded-full">
                      <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Compliance Rate</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-muted rounded-full">
                      <div className="w-23 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">96%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-muted rounded-full">
                      <div className="w-18 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RoleDashboard;