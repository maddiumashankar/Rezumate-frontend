import { useState } from 'react';
import apiClient from '@/utils/apiClient';
import { toast } from 'react-hot-toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const generateResume = async (data: any) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/api/generate-resume', data);
      toast.success('Resume generated successfully!');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to generate resume');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (file: File, templateId: string) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('templateId', templateId);

    try {
      const response = await apiClient.post('/api/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Resume uploaded successfully!');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload resume');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const tailorResume = async (resumeFile: File, jobDescription: string, templateId: string) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);
    formData.append('templateId', templateId);

    try {
      const response = await apiClient.post('/api/tailor-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Resume tailored successfully!');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to tailor resume');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTemplates = async () => {
    try {
      const response = await apiClient.get('/api/templates');
      return response.data;
    } catch (error: any) {
      toast.error('Failed to fetch templates');
      throw error;
    }
  };

  return {
    loading,
    generateResume,
    uploadResume,
    tailorResume,
    getTemplates,
  };
};
