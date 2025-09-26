import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ComplianceTracker = () => {
  const complianceStats = [
    { title: 'Overall Compliance', value: '99.2%', status: 'excellent', icon: Shield },
    { title: 'Pending Reviews', value: '3', status: 'warning', icon: Clock },
    { title: 'Overdue Items', value: '1', status: 'danger', icon: AlertTriangle },
    { title: 'Completed This Month', value: '47', status: 'success', icon: CheckCircle }
  ];

  const complianceItems = [
    { 
      id: 1, 
      document: 'Safety Protocol Review', 
      department: 'Engineering', 
      status: 'Compliant', 
      dueDate: '2024-01-20',
      priority: 'High',
      lastReview: '2024-01-15'
    },
    { 
      id: 2, 
      document: 'Employee Background Checks', 
      department: 'HR', 
      status: 'Pending', 
      dueDate: '2024-01-18',
      priority: 'Medium',
      lastReview: '2024-01-10'
    },
    { 
      id: 3, 
      document: 'Financial Audit Report', 
      department: 'Finance', 
      status: 'Overdue', 
      dueDate: '2024-01-12',
      priority: 'High',
      lastReview: '2024-01-05'
    },
    { 
      id: 4, 
      document: 'Legal Contract Review', 
      department: 'Legal', 
      status: 'In Review', 
      dueDate: '2024-01-25',
      priority: 'Low',
      lastReview: '2024-01-14'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Compliant':
        return <Badge className="bg-green-100 text-green-800">Compliant</Badge>;
      case 'Pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'Overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'In Review':
        return <Badge variant="outline">In Review</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Compliance Tracker</h1>
          <p className="text-muted-foreground">Monitor and manage compliance across all departments</p>
        </div>

        {/* Compliance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {complianceStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      stat.status === 'excellent' ? 'bg-green-100 text-green-600' :
                      stat.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      stat.status === 'danger' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Compliance Items Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Compliance Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complianceItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.document}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                        <TableCell className="text-muted-foreground">{item.dueDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Review</Button>
                            <Button variant="outline" size="sm">Update</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Run Compliance Check
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    View Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This Month</span>
                    <span className="text-sm font-medium text-green-600">+2.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Month</span>
                    <span className="text-sm font-medium text-green-600">+1.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quarter</span>
                    <span className="text-sm font-medium text-green-600">+5.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Financial Audit Overdue</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">HR Review Due Soon</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComplianceTracker;