import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useResumeStore } from '@/store/useResumeStore';
import { personalInfoSchema, PersonalInfo } from '@/utils/validation';
import { toast } from 'react-hot-toast';

const CreateResume = () => {
  const navigate = useNavigate();
  const { selectedTemplate, personalInfo, setPersonalInfo, currentStep, setCurrentStep } = useResumeStore();
  const [step, setStep] = useState(currentStep);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo as PersonalInfo,
  });

  const steps = [
    'Personal Info',
    'Experience',
    'Education',
    'Skills',
    'Summary',
    'Projects',
  ];

  const onSubmit = (data: PersonalInfo) => {
    setPersonalInfo(data);
    toast.success('Personal information saved!');
    if (step < steps.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      setCurrentStep(nextStep);
    } else {
      navigate('/preview');
    }
  };

  const goBack = () => {
    if (step > 0) {
      const prevStep = step - 1;
      setStep(prevStep);
      setCurrentStep(prevStep);
    } else {
      navigate('/templates');
    }
  };

  if (!selectedTemplate) {
    navigate('/templates');
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Create Your Resume</h1>
            <p className="text-muted-foreground">
              Step {step + 1} of {steps.length}: {steps[step]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              {steps.map((stepName, index) => (
                <span key={index} className={index === step ? 'font-semibold text-primary' : ''}>
                  {stepName}
                </span>
              ))}
            </div>
          </div>

          <Card style={{ boxShadow: 'var(--shadow-card)' }}>
            <CardHeader>
              <CardTitle>{steps[step]}</CardTitle>
            </CardHeader>
            <CardContent>
              {step === 0 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        {...register('fullName')}
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        {...register('phone')}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        {...register('location')}
                        placeholder="San Francisco, CA"
                      />
                      {errors.location && (
                        <p className="text-sm text-destructive">{errors.location.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedIn">LinkedIn URL</Label>
                      <Input
                        id="linkedIn"
                        {...register('linkedIn')}
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                      {errors.linkedIn && (
                        <p className="text-sm text-destructive">{errors.linkedIn.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input
                        id="website"
                        {...register('website')}
                        placeholder="https://johndoe.com"
                      />
                      {errors.website && (
                        <p className="text-sm text-destructive">{errors.website.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={goBack}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit">
                      Save & Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}

              {step !== 0 && (
                <div className="space-y-6">
                  <div className="rounded-lg bg-muted p-8 text-center">
                    <p className="text-muted-foreground">
                      {steps[step]} form will be implemented here
                    </p>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={goBack}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        if (step < steps.length - 1) {
                          const nextStep = step + 1;
                          setStep(nextStep);
                          setCurrentStep(nextStep);
                        } else {
                          navigate('/preview');
                        }
                      }}
                    >
                      {step === steps.length - 1 ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Generate Resume
                        </>
                      ) : (
                        <>
                          Continue
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateResume;
