import React, { useState, useRef, useEffect } from 'react';
import { Upload, Search, FileText, BarChart3, PieChart, Filter, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/DashboardHeader';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const MainDashboard = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [processing, setProcessing] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload documents.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Unsupported File Type",
        description: "Please upload PDF, Word, image, or text files only.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Create document record first
      const { data: documentData, error: docError } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          filename: file.name,
          file_path: '',
          file_size: file.size,
          mime_type: file.type,
          category: 'Processing',
          status: 'uploading'
        })
        .select()
        .single();

      if (docError) throw docError;

      const documentId = documentData.id;
      setProcessing(prev => [...prev, documentId]);

      // Upload file to storage
      const filePath = `${user.id}/${documentId}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Update document with file path
      await supabase
        .from('documents')
        .update({ file_path: filePath, status: 'processing' })
        .eq('id', documentId);

      // Convert file to base64 for processing
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result?.toString().split(',')[1] || '';
        
        // Send to edge function for processing
        const { data: processResult, error: processError } = await supabase.functions
          .invoke('process-document', {
            body: {
              documentId,
              fileData: base64Data,
              filename: file.name,
              mimeType: file.type
            }
          });

        if (processError) {
          console.error('Processing error:', processError);
          await supabase
            .from('documents')
            .update({ status: 'failed', processing_error: processError.message })
            .eq('id', documentId);
          
          toast({
            title: "Processing Failed",
            description: "Document upload failed. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Document Processed",
            description: `Successfully processed and categorized as ${processResult.category}`,
          });
          
          // Refresh documents list
          loadDocuments();
        }

        setProcessing(prev => prev.filter(id => id !== documentId));
      };

      reader.readAsDataURL(file);

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const loadDocuments = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error loading documents:', error);
    } else {
      setDocuments(data || []);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [user]);

  const statsCards = [
    { title: 'Total Documents Processed', value: '1,247', trend: '+12%' },
    { title: 'Avg. Time Saved', value: '2.3 hrs', trend: '+0.5 hrs' },
    { title: 'Compliance Status', value: '99.2%', trend: '+0.3%' },
    { title: 'Notifications', value: '5 New', trend: 'Alerts' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-yellow-400 animate-pulse" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const aiSummaries = documents
    .filter(doc => doc.status === 'completed' && doc.ai_summary)
    .slice(0, 3)
    .map(doc => ({
      title: doc.filename,
      summary: doc.ai_summary,
      category: doc.category
    }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DashboardHeader />
      
      <main className="container py-8 space-y-8">
        {/* Top Section - Upload Box */}
        <div className="flex justify-center">
          <Card className="w-full max-w-2xl">
            <CardContent className="p-8">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Document</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your files here, or click to browse
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.png,.txt"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Choose Files'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.trend}</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search & Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Quick Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Search documents..." />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Document Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Document Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.filename}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{doc.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(doc.status)}
                          <Badge variant={
                            doc.status === 'completed' ? 'default' :
                            doc.status === 'failed' ? 'destructive' : 'secondary'
                          }>
                            {doc.status === 'completed' ? 'Processed' : 
                             doc.status === 'failed' ? 'Failed' : 
                             doc.status === 'processing' ? 'Processing' : 'Uploading'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(doc.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {documents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No documents uploaded yet. Upload your first document above!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* AI Summary Preview */}
          <Card>
            <CardHeader>
              <CardTitle>AI Summary Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiSummaries.length > 0 ? (
                  aiSummaries.map((summary, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{summary.title}</h4>
                        <Badge variant="outline">{summary.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{summary.summary}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No AI summaries available yet. Upload and process documents to see summaries here.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Analytics & Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Analytics & Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Documents processed per day chart</p>
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
              <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Compliance status pie chart</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainDashboard;