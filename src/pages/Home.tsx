import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Upload, Target, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const features = [
    {
      icon: FileText,
      title: 'Create from Scratch',
      description: 'Choose a template and fill in your details with our intuitive step-by-step form.',
      link: '/create',
    },
    {
      icon: Upload,
      title: 'Upload & Reformat',
      description: 'Upload your old resume and let AI transform it into an ATS-friendly format.',
      link: '/upload',
    },
    {
      icon: Target,
      title: 'Tailor to Jobs',
      description: 'Upload your resume and job description to get a perfectly tailored resume.',
      link: '/tailor',
    },
  ];

  const benefits = [
    { icon: Sparkles, text: 'AI-Powered Intelligence' },
    { icon: Zap, text: 'Lightning Fast Generation' },
    { icon: Shield, text: 'ATS-Optimized Templates' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 md:py-32"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Generate{' '}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  ATS-Ready Resumes
                </span>{' '}
                with AI
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Build professional, ATS-optimized resumes in minutes. Let AI handle the formatting
                while you focus on landing your dream job.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="shadow-lg" style={{ boxShadow: 'var(--shadow-elegant)' }}>
                  <Link to="/create">
                    <FileText className="mr-2 h-5 w-5" />
                    Create New Resume
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/templates">View Templates</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <benefit.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl" style={{ boxShadow: 'var(--shadow-elegant)' }}>
                <img
                  src={heroImage}
                  alt="AI Resume Builder Hero"
                  className="w-full rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Three Ways to Build Your Perfect Resume
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Choose the method that works best for you. Our AI adapts to your needs.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={feature.link}>
                  <Card
                    className="h-full transition-all hover:border-primary/50"
                    style={{
                      boxShadow: 'var(--shadow-card)',
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Land Your Dream Job?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Join thousands of professionals who trust Rezumate to create winning resumes.
            </p>
            <Button size="lg" className="shadow-lg" asChild style={{ boxShadow: 'var(--shadow-elegant)' }}>
              <Link to="/create">
                Get Started Free
                <Sparkles className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
