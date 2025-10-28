import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UploadBox from '@/components/UploadBox';
import TemplateCard from '@/components/TemplateCard';
import Loader from '@/components/Loader';
import { useApi } from '@/hooks/useApi';
import { useResumeStore } from '@/store/useResumeStore';

const UploadResume = () => {
  const navigate = useNavigate();
  const { uploadResume, loading } = useApi();
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [localSelected, setLocalSelected] = useState<string | null>(selectedTemplate);

  const templates = [
    { id: 'modern', name: 'Modern Professional', description: 'Clean contemporary design', popular: true },
    { id: 'classic', name: 'Classic Executive', description: 'Traditional corporate layout', popular: false },
    { id: 'elegant', name: 'Elegant Minimalist', description: 'Sophisticated simplicity', popular: true },
    { id: 'compact', name: 'Compact One-Page', description: 'Efficient single page', popular: false },
  ];

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
  };

  const handleGenerate = async () => {
    if (!uploadedFile || !localSelected) return;

    try {
      setSelectedTemplate(localSelected);
      await uploadResume(uploadedFile, localSelected);
      navigate('/preview');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              Upload & <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Reformat</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Upload your existing resume and let AI transform it into an ATS-friendly format
            </p>
          </div>

          {loading ? (
            <Loader message="Analyzing and reformatting your resume..." />
          ) : (
            <div className="space-y-8">
              <Card style={{ boxShadow: 'var(--shadow-card)' }}>
                <CardHeader>
                  <CardTitle>Step 1: Upload Your Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <UploadBox onFileSelect={handleFileSelect} />
                </CardContent>
              </Card>

              <Card style={{ boxShadow: 'var(--shadow-card)' }}>
                <CardHeader>
                  <CardTitle>Step 2: Choose a Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {templates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        {...template}
                        selected={localSelected === template.id}
                        onSelect={setLocalSelected}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {uploadedFile && localSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center"
                >
                  <Button
                    size="lg"
                    onClick={handleGenerate}
                    className="shadow-lg"
                    style={{ boxShadow: 'var(--shadow-elegant)' }}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate ATS-Ready Resume
                  </Button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UploadResume;
