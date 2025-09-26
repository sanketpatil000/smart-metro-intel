import React from 'react';
import { FileText, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DocumentFeed = () => {
  const documents = [
    { id: 1, title: 'Q4 Engineering Report', category: 'Engineering', status: 'Processed', date: '2024-01-15', size: '2.3 MB' },
    { id: 2, title: 'HR Policy Update', category: 'HR', status: 'Pending', date: '2024-01-14', size: '1.8 MB' },
    { id: 3, title: 'Finance Audit Report', category: 'Finance', status: 'Processing', date: '2024-01-13', size: '3.1 MB' },
    { id: 4, title: 'Maintenance Schedule', category: 'Maintenance', status: 'Completed', date: '2024-01-12', size: '0.9 MB' },
    { id: 5, title: 'Legal Compliance Review', category: 'Legal', status: 'Processed', date: '2024-01-11', size: '2.7 MB' },
    { id: 6, title: 'Operations Manual', category: 'Operations', status: 'Completed', date: '2024-01-10', size: '5.2 MB' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Document Feed</h1>
          <p className="text-muted-foreground">View and manage all uploaded documents</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Search documents..." 
                  className="w-full"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Advanced Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              All Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{doc.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        doc.status === 'Completed' || doc.status === 'Processed' ? 'default' :
                        doc.status === 'Processing' ? 'secondary' : 'outline'
                      }>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{doc.date}</TableCell>
                    <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default DocumentFeed;