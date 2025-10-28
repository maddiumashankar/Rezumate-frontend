import { motion } from 'framer-motion';
import { Download, RotateCcw, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '@/store/useResumeStore';

const Preview = () => {
  const navigate = useNavigate();
  const { selectedTemplate, resetResume } = useResumeStore();

  const handleDownload = () => {
    // This would integrate with the backend to download the PDF
    console.log('Downloading resume...');
  };

  const handleRegenerate = () => {
    resetResume();
    navigate('/templates');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">Resume Preview</h1>
              <p className="text-muted-foreground">
                Template: {selectedTemplate || 'Not selected'}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/create')}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" onClick={handleRegenerate}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Start Over
              </Button>
              <Button onClick={handleDownload} className="shadow-lg" style={{ boxShadow: 'var(--shadow-elegant)' }}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>

          <Card style={{ boxShadow: 'var(--shadow-card)' }}>
            <CardContent className="p-8">
              <div className="flex min-h-[800px] items-center justify-center rounded-lg bg-secondary/30">
                <div className="text-center">
                  <p className="mb-4 text-lg font-medium text-muted-foreground">
                    PDF Preview will be rendered here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Using react-pdf to display the generated resume
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Preview;
