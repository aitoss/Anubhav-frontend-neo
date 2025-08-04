export interface FormData {
  // Step 1: Basic Information
  name: string;
  email: string;
  company: string;
  position: string;
  title: string;
  tags: string[];
  bannerImageUrl?: string;
  
  // Step 2: Article Content
  article: string;
  
  // Meta information
  currentStep: number;
  lastUpdated: string;
}

// Form validation errors
export interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  position?: string;
  title?: string;
  file?: string;
  tags?: string;
  article?: string;
}

// Hook return type
export interface UseCreateFormReturn {
  // Form data
  formData: FormData;
  
  // Form state
  step: number;
  errors: FormErrors;
  isLoading: boolean;
  
  // Form actions
  updateFormData: (data: Partial<FormData>) => void;
  setStep: (step: number) => void;
  setErrors: (errors: FormErrors) => void;
  setIsLoading: (loading: boolean) => void;
  
  // Navigation
  handleNext: () => boolean;
  handleBack: () => void;
  goToStep: (step: number) => void;
  
  // Storage actions
  clearForm: () => void;
  hasUnsavedData: boolean;
  loadedFromStorage: boolean;
  lastSavedAge: number;
  resetAfterSubmission: () => void;
}

// Form storage key
export const FORM_STORAGE_KEY = 'anubhav-create-form-data';
