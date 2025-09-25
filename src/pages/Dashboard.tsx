import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardHeader from '@/components/DashboardHeader';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Upload, Search, BarChart3, PieChart, Clock, CheckCircle, AlertTriangle, Filter, Users, Shield, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
      title: 'Total Documents Processed',
      value: '1,247',
      icon: FileText,
      trend: '+12%',
      description: 'This month'
    },
    {
      title: 'Avg. Time Saved',
      value: '4.2h',
      icon: Clock,
      trend: '+15%',
      description: 'Per document'
    },
    {
      title: 'Compliance Status',
      value: '99.2%',
      icon: Shield,
      trend: '+0.3%',
      description: 'System wide'
    },
    {
      title: 'Notifications',
      value: '5',
      icon: AlertTriangle,
      trend: 'New',
      description: 'New alerts'
    }
  ];

  const recentDocuments = [
    {
      title: 'Engineering Report Q4 2024',
      category: 'Engineering',
      status: 'Processed',
      date: '2024-01-15',
      aiSummary: 'Technical specifications review with 3 critical updates identified.'
    },
    {
      title: 'HR Policy Update Manual',
      category: 'HR',
      status: 'Pending Review',
      date: '2024-01-14',
      aiSummary: 'Policy changes affecting employee benefits and remote work guidelines.'
    },
    {
      title: 'Financial Audit Report',
      category: 'Finance',
      status: 'Compliance Check',
      date: '2024-01-13',
      aiSummary: 'Quarterly financial review with budget variance analysis.'
    },
    {
      title: 'Maintenance Schedule',
      category: 'Maintenance',
      status: 'Processed',
      date: '2024-01-12',
      aiSummary: 'Equipment maintenance timeline and resource allocation plan.'
    }
  ];

  const complianceData = [
    { status: 'OK', count: 892, color: 'bg-green-500' },
    { status: 'Pending', count: 156, color: 'bg-yellow-500' },
    { status: 'Overdue', count: 23, color: 'bg-red-500' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log('Files uploaded:', files);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile.full_name || 'User'}
          </h1>
          <p className="text-muted-foreground">
            Turn document overload into actionable insights with AI
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 hover:border-primary/50 transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Upload Document for AI Processing</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop files here or click to browse (PDF, Word, Images supported)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
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

        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Quick Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search documents, summaries, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Document Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Document Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentDocuments.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{doc.title}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {doc.category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={doc.status === 'Processed' ? 'default' : 'secondary'}
                        >
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {doc.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* AI Summary Preview */}
          <Card>
            <CardHeader>
              <CardTitle>AI Summary Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentDocuments.slice(0, 3).map((doc, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium text-sm mb-2">{doc.title}</h4>
                  <p className="text-xs text-muted-foreground">{doc.aiSummary}</p>
                  <Button variant="link" className="p-0 h-auto text-xs mt-2">
                    View Full Summary →
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Analytics & Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Analytics & Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Document Processing Analytics</p>
                  <p className="text-xs text-muted-foreground mt-1">Charts coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                Compliance Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium">{item.status}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Total: {complianceData.reduce((sum, item) => sum + item.count, 0)} documents
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;