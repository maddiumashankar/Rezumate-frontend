import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import UploadBox from '@/components/UploadBox';
import TemplateCard from '@/components/TemplateCard';
import Loader from '@/components/Loader';
import { useApi } from '@/hooks/useApi';
import { useResumeStore } from '@/store/useResumeStore';

const TailorResume = () => {
  const navigate = useNavigate();
  const { tailorResume, loading } = useApi();
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
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

  const handleTailor = async () => {
    if (!uploadedFile || !jobDescription || !localSelected) return;

    try {
      setSelectedTemplate(localSelected);
      await tailorResume(uploadedFile, jobDescription, localSelected);
      navigate('/preview');
    } catch (error) {
      console.error('Tailoring failed:', error);
    }
  };

  const canSubmit = uploadedFile && jobDescription.trim().length > 50 && localSelected;

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
              Tailor Resume to{' '}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Job Description
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Upload your resume and paste the job description. AI will optimize your resume for that specific role.
            </p>
          </div>

          {loading ? (
            <Loader message="AI is tailoring your resume to the job..." />
          ) : (
            <div className="space-y-8">
              <div className="grid gap-8 lg:grid-cols-2">
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
                    <CardTitle>Step 2: Paste Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="jobDescription">Job Description *</Label>
                      <Textarea
                        id="jobDescription"
                        placeholder="Paste the complete job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={12}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        {jobDescription.length} characters (minimum 50 required)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card style={{ boxShadow: 'var(--shadow-card)' }}>
                <CardHeader>
                  <CardTitle>Step 3: Choose a Template</CardTitle>
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

              {canSubmit && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center"
                >
                  <Button
                    size="lg"
                    onClick={handleTailor}
                    className="shadow-lg"
                    style={{ boxShadow: 'var(--shadow-elegant)' }}
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Tailor Resume for This Job
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

export default TailorResume;
