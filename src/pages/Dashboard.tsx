import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Plus, Calendar, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/useAuthStore';

interface Resume {
  id: string;
  title: string;
  template: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'completed';
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  // Mock resume data - Replace with actual API call
  const mockResumes: Resume[] = [
    {
      id: '1',
      title: 'Software Engineer Resume',
      template: 'Modern',
      createdAt: '2025-01-15',
      updatedAt: '2025-01-20',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Frontend Developer Resume',
      template: 'Classic',
      createdAt: '2025-01-10',
      updatedAt: '2025-01-18',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Full Stack Developer Resume',
      template: 'Elegant',
      createdAt: '2025-01-05',
      updatedAt: '2025-01-05',
      status: 'draft',
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Resumes</h1>
              <p className="mt-2 text-muted-foreground">
                Manage and track all your resumes in one place
              </p>
            </div>
            <Button size="lg" asChild>
              <Link to="/create">
                <Plus className="mr-2 h-5 w-5" />
                Create New Resume
              </Link>
            </Button>
          </div>

          {mockResumes.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">No resumes yet</h3>
              <p className="mb-6 text-muted-foreground">
                Get started by creating your first resume
              </p>
              <Button asChild>
                <Link to="/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Resume
                </Link>
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockResumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="line-clamp-1">{resume.title}</CardTitle>
                          <CardDescription className="mt-1">
                            Template: {resume.template}
                          </CardDescription>
                        </div>
                        <Badge variant={resume.status === 'completed' ? 'default' : 'secondary'}>
                          {resume.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Created: {new Date(resume.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Updated: {new Date(resume.updatedAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link to={`/preview?id=${resume.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
