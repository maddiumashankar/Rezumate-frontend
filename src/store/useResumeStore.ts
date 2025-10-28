import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PersonalInfo, Experience, Education, Skills, Project } from '@/utils/validation';

interface ResumeState {
  selectedTemplate: string | null;
  personalInfo: Partial<PersonalInfo>;
  experiences: Experience[];
  education: Education[];
  skills: Partial<Skills>;
  projects: Project[];
  summary: string;
  currentStep: number;
  
  setSelectedTemplate: (template: string) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (index: number, experience: Experience) => void;
  removeExperience: (index: number) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (index: number, edu: Education) => void;
  removeEducation: (index: number) => void;
  setSkills: (skills: Partial<Skills>) => void;
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Project) => void;
  removeProject: (index: number) => void;
  setSummary: (summary: string) => void;
  setCurrentStep: (step: number) => void;
  resetResume: () => void;
}

const initialState = {
  selectedTemplate: null,
  personalInfo: {},
  experiences: [],
  education: [],
  skills: {},
  projects: [],
  summary: '',
  currentStep: 0,
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      setPersonalInfo: (info) => set((state) => ({ personalInfo: { ...state.personalInfo, ...info } })),
      
      addExperience: (experience) => set((state) => ({ experiences: [...state.experiences, experience] })),
      updateExperience: (index, experience) => set((state) => ({
        experiences: state.experiences.map((exp, i) => (i === index ? experience : exp)),
      })),
      removeExperience: (index) => set((state) => ({
        experiences: state.experiences.filter((_, i) => i !== index),
      })),
      
      addEducation: (edu) => set((state) => ({ education: [...state.education, edu] })),
      updateEducation: (index, edu) => set((state) => ({
        education: state.education.map((e, i) => (i === index ? edu : e)),
      })),
      removeEducation: (index) => set((state) => ({
        education: state.education.filter((_, i) => i !== index),
      })),
      
      setSkills: (skills) => set((state) => ({ skills: { ...state.skills, ...skills } })),
      
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (index, project) => set((state) => ({
        projects: state.projects.map((p, i) => (i === index ? project : p)),
      })),
      removeProject: (index) => set((state) => ({
        projects: state.projects.filter((_, i) => i !== index),
      })),
      
      setSummary: (summary) => set({ summary }),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetResume: () => set(initialState),
    }),
    {
      name: 'resume-storage',
    }
  )
);
