import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardHeader from '@/components/DashboardHeader';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Users, Shield, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
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

  const quickStats = [
    {
      title: 'Documents Processed',
      value: '1,247',
      icon: FileText,
      trend: '+12%',
      description: 'This month'
    },
    {
      title: 'Active Users',
      value: '89',
      icon: Users,
      trend: '+5%',
      description: 'Currently online'
    },
    {
      title: 'Compliance Rate',
      value: '99.2%',
      icon: Shield,
      trend: '+0.3%',
      description: 'System wide'
    },
    {
      title: 'Processing Speed',
      value: '2.3s',
      icon: TrendingUp,
      trend: '-0.5s',
      description: 'Average time'
    }
  ];

  const recentActivity = [
    {
      action: 'Document processed',
      document: 'Engineering Report Q4',
      time: '2 minutes ago',
      status: 'completed'
    },
    {
      action: 'Compliance check',
      document: 'HR Policy Update',
      time: '15 minutes ago',
      status: 'completed'
    },
    {
      action: 'Alert triggered',
      document: 'Finance Audit Report',
      time: '1 hour ago',
      status: 'pending'
    },
    {
      action: 'Document uploaded',
      document: 'Maintenance Schedule',
      time: '2 hours ago',
      status: 'processing'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile.full_name || 'User'}
          </h1>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{profile.role}</Badge>
            <span className="text-muted-foreground">
              • Last login: Today at 9:30 AM
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-green-600 font-medium">{stat.trend}</span>
                        {' '}{stat.description}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-500' :
                        activity.status === 'processing' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.document}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <Badge 
                        variant={activity.status === 'completed' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-left">
                  <FileText className="h-6 w-6 mb-2" />
                  <p className="font-medium">Upload Document</p>
                  <p className="text-xs opacity-80">Add new files for processing</p>
                </button>
                
                <button className="p-4 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-left">
                  <Shield className="h-6 w-6 mb-2" />
                  <p className="font-medium">Run Compliance Check</p>
                  <p className="text-xs opacity-80">Verify document compliance</p>
                </button>
                
                <button className="p-4 rounded-lg bg-accent text-accent-foreground hover:bg-accent/80 transition-colors text-left">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <p className="font-medium">View Analytics</p>
                  <p className="text-xs opacity-80">System performance metrics</p>
                </button>
                
                <button className="p-4 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-left">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <p className="font-medium">Generate Report</p>
                  <p className="text-xs opacity-80">Create summary reports</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;