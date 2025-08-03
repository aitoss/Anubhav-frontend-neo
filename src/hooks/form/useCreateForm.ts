/**
 * Custom hook for managing 3-step form with persistent local storage
 * Handles form state, validation, persistence, and navigation
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  FormData, 
  saveFormData, 
  getFormData, 
  clearFormData, 
  hasStoredFormData,
  getFormDataAge,
  getDefaultFormData 
} from './useFormStorage';

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
  lastSavedAge: number;
  
  // Form submission
  resetAfterSubmission: () => void;
}

const useCreateForm = (): UseCreateFormReturn => {
  // Initialize state from localStorage or defaults
  const [formData, setFormData] = useState<FormData>(getDefaultFormData);
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    
    // Load saved data on mount (client-side only)
    const savedData = getFormData();
    if (savedData) {
      setFormData(savedData);
      // Restore the step if user was in the middle of filling the form
      if (savedData.currentStep && savedData.currentStep <= 3) {
        setStep(savedData.currentStep);
      }
    }
  }, []);

  // Save data to localStorage whenever formData changes (client-side only)
  useEffect(() => {
    if (!mounted) return;
    
    const dataToSave = {
      ...formData,
      currentStep: step,
    };
    saveFormData(dataToSave);
  }, [formData, step, mounted]);

  // Update form data with automatic persistence
  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data,
    }));
  }, []);

  // Validate form data for current step
  const validateStep = useCallback((currentStep: number): FormErrors => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name cannot be empty";
      }
      
      if (!formData.email.trim()) {
        newErrors.email = "Email cannot be empty";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
      }
      
      if (!formData.company.trim()) {
        newErrors.company = "Company cannot be empty";
      }
      
      if (!formData.position.trim()) {
        newErrors.position = "Position cannot be empty";
      }
      
      if (!formData.title.trim()) {
        newErrors.title = "Title cannot be empty";
      }
      
      if (!formData.bannerImageUrl) {
        newErrors.file = "Please upload a banner image";
      }
      
      if (formData.tags.length === 0) {
        newErrors.tags = "Write a tag and press enter to add it";
      }
    }

    if (currentStep === 2) {
      if (!formData.article.trim()) {
        newErrors.article = "Please write your article before proceeding";
      }
    }

    return newErrors;
  }, [formData]);

  // Handle next step navigation with validation
  const handleNext = useCallback((): boolean => {
    const stepErrors = validateStep(step);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return false;
    }
    
    setErrors({});
    
    if (step < 3) {
      const nextStep = step + 1;
      setStep(nextStep);
      
      // Save the step progression
      updateFormData({ currentStep: nextStep });
      return true;
    }
    
    return false;
  }, [step, validateStep, updateFormData]);

  // Handle back navigation
  const handleBack = useCallback(() => {
    if (step > 1) {
      const prevStep = step - 1;
      setStep(prevStep);
      setErrors({}); // Clear errors when going back
      
      // Save the step regression
      updateFormData({ currentStep: prevStep });
    }
  }, [step, updateFormData]);

  // Go directly to a specific step
  const goToStep = useCallback((targetStep: number) => {
    if (targetStep >= 1 && targetStep <= 3) {
      setStep(targetStep);
      setErrors({});
      updateFormData({ currentStep: targetStep });
    }
  }, [updateFormData]);

  // Clear all form data
  const clearForm = useCallback(() => {
    const defaultData = getDefaultFormData();
    setFormData(defaultData);
    setStep(1);
    setErrors({});
    setIsLoading(false);
    clearFormData();
  }, []);

  // Reset form after successful submission
  const resetAfterSubmission = useCallback(() => {
    clearForm();
  }, [clearForm]);

  // Check if there's unsaved data (client-side only)
  const hasUnsavedData = mounted ? hasStoredFormData() : false;
  
  // Get age of last saved data (client-side only)
  const lastSavedAge = mounted ? getFormDataAge() : 0;

  return {
    // Form data
    formData,
    
    // Form state
    step,
    errors,
    isLoading,
    
    // Form actions
    updateFormData,
    setStep,
    setErrors,
    setIsLoading,
    
    // Navigation
    handleNext,
    handleBack,
    goToStep,
    
    // Storage actions
    clearForm,
    hasUnsavedData,
    lastSavedAge,
    
    // Form submission
    resetAfterSubmission,
  };
};

export default useCreateForm;
