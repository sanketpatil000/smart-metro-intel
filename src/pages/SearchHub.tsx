import React from 'react';
import { Search, Filter, FileText, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SearchHub = () => {
  const searchResults = [
    { title: 'Metro Safety Protocol 2024', snippet: 'Updated safety guidelines for metro operations...', category: 'Engineering', relevance: 98 },
    { title: 'Employee Benefits Manual', snippet: 'Comprehensive guide to employee benefits and policies...', category: 'HR', relevance: 95 },
    { title: 'Financial Audit Q4 2023', snippet: 'Quarterly financial review and audit results...', category: 'Finance', relevance: 92 },
    { title: 'Legal Compliance Framework', snippet: 'Framework for ensuring legal compliance across operations...', category: 'Legal', relevance: 89 }
  ];

  const recentSearches = [
    'safety protocol',
    'employee benefits',
    'financial audit',
    'compliance framework'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Hub</h1>
          <p className="text-muted-foreground">Find documents and information quickly</p>
        </div>

        {/* Main Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Search across all documents and categories..." 
                  className="w-full text-lg p-6"
                />
              </div>
              <Button className="px-8">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-3 w-3 mr-1" />
                Advanced Filters
              </Button>
              <Badge variant="secondary">Engineering</Badge>
              <Badge variant="secondary">HR</Badge>
              <Badge variant="secondary">Legal</Badge>
              <Badge variant="secondary">Finance</Badge>
              <Badge variant="secondary">Maintenance</Badge>
              <Badge variant="secondary">Operations</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Results */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {searchResults.map((result, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-primary hover:underline cursor-pointer">
                          {result.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{result.category}</Badge>
                          <span className="text-xs text-green-600">{result.relevance}% match</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{result.snippet}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          PDF Document
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Updated 2 days ago
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Searches */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Searches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <Button 
                      key={index} 
                      variant="ghost" 
                      className="w-full justify-start text-left"
                      size="sm"
                    >
                      <Clock className="h-3 w-3 mr-2" />
                      {search}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Document Type</h4>
                    <div className="space-y-1">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">PDF</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Word</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Excel</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Date Range</h4>
                    <div className="space-y-1">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="date" className="rounded" />
                        <span className="text-sm">Last week</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="date" className="rounded" />
                        <span className="text-sm">Last month</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="date" className="rounded" />
                        <span className="text-sm">Last year</span>
                      </label>
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

export default SearchHub;