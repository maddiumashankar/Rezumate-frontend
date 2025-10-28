import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
}

const UploadBox = ({ onFileSelect, accept = { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] }, maxSize = 10 * 1024 * 1024 }: UploadBoxProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
      toast.success('File uploaded successfully!');
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    onDropRejected: () => {
      toast.error('File rejected. Please check size and format.');
    },
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  return (
    <div
      {...getRootProps()}
      className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-border bg-secondary/30 hover:border-primary/50 hover:bg-primary/5'
      }`}
      style={{ transition: 'var(--transition-smooth)' }}
    >
      <input {...getInputProps()} />

      {selectedFile ? (
        <div className="flex items-center justify-center gap-4">
          <File className="h-8 w-8 text-primary" />
          <div className="flex-1 text-left">
            <p className="font-medium">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={removeFile}
            className="text-destructive hover:bg-destructive/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="font-medium">
              {isDragActive ? 'Drop your file here' : 'Drag & drop your resume'}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse (PDF, DOC, DOCX up to 10MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
