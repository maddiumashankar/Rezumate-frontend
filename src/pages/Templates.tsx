import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '@/components/TemplateCard';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';

const Templates = () => {
  const navigate = useNavigate();
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();
  const [localSelected, setLocalSelected] = useState<string | null>(selectedTemplate);

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and contemporary design perfect for tech and creative roles.',
      popular: true,
    },
    {
      id: 'classic',
      name: 'Classic Executive',
      description: 'Traditional layout ideal for corporate and formal positions.',
      popular: false,
    },
    {
      id: 'elegant',
      name: 'Elegant Minimalist',
      description: 'Sophisticated simplicity that lets your experience shine.',
      popular: true,
    },
    {
      id: 'compact',
      name: 'Compact One-Page',
      description: 'Efficiently organize all your information on a single page.',
      popular: false,
    },
    {
      id: 'creative',
      name: 'Creative Designer',
      description: 'Bold and artistic layout for creative professionals.',
      popular: true,
    },
    {
      id: 'technical',
      name: 'Technical Expert',
      description: 'Structured format highlighting technical skills and projects.',
      popular: false,
    },
    {
      id: 'startup',
      name: 'Startup Innovator',
      description: 'Dynamic design for entrepreneurs and startup enthusiasts.',
      popular: false,
    },
    {
      id: 'academic',
      name: 'Academic Scholar',
      description: 'Comprehensive layout for researchers and academics.',
      popular: false,
    },
  ];

  const handleSelect = (templateId: string) => {
    setLocalSelected(templateId);
  };

  const handleContinue = () => {
    if (localSelected) {
      setSelectedTemplate(localSelected);
      navigate('/create');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Choose Your Perfect{' '}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Template
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Select from our professionally designed, ATS-optimized templates. All templates are
            fully customizable to match your style.
          </p>
        </motion.div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <TemplateCard
                {...template}
                selected={localSelected === template.id}
                onSelect={handleSelect}
              />
            </motion.div>
          ))}
        </div>

        {localSelected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 transform"
          >
            <Button
              size="lg"
              onClick={handleContinue}
              className="shadow-lg"
              style={{ boxShadow: 'var(--shadow-elegant)' }}
            >
              Continue with Selected Template
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Templates;
