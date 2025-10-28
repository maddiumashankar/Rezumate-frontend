import { motion } from 'framer-motion';
import { FileText, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  popular?: boolean;
  selected?: boolean;
  onSelect: (id: string) => void;
}

const TemplateCard = ({ id, name, description, popular, selected, onSelect }: TemplateCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Card
        className={`relative cursor-pointer overflow-hidden transition-all ${
          selected
            ? 'border-2 border-primary shadow-lg'
            : 'border border-border hover:border-primary/50'
        }`}
        style={{
          boxShadow: selected ? 'var(--shadow-hover)' : 'var(--shadow-card)',
          transition: 'var(--transition-smooth)',
        }}
        onClick={() => onSelect(id)}
      >
        {popular && (
          <Badge className="absolute right-2 top-2 bg-accent text-accent-foreground">
            Popular
          </Badge>
        )}

        {selected && (
          <div className="absolute right-2 top-2 rounded-full bg-primary p-1">
            <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
          </div>
        )}

        <CardHeader>
          <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10">
            <FileText className="h-20 w-20 text-primary/60" />
          </div>
          <CardTitle className="text-lg">{name}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>

        <CardFooter>
          <Button
            variant={selected ? 'default' : 'outline'}
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(id);
            }}
          >
            {selected ? 'Selected' : 'Use Template'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TemplateCard;
