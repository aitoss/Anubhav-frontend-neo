/**
 * Local storage utilities for form data persistence
 * Provides type-safe local storage operations with error handling
 */

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

export const FORM_STORAGE_KEY = 'anubhav-create-form-data';

/**
 * Check if we're running on the client side
 */
const isClient = typeof window !== 'undefined';

/**
 * Save form data to localStorage
 */
export const saveFormData = (data: Partial<FormData>): boolean => {
  if (!isClient) return false;
  
  try {
    const existingData = getFormData();
    const updatedData: FormData = {
      ...existingData,
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(updatedData));
    return true;
  } catch (error) {
    console.error('Failed to save form data to localStorage:', error);
    return false;
  }
};

/**
 * Get form data from localStorage
 */
export const getFormData = (): FormData => {
  if (!isClient) return getDefaultFormData();
  
  try {
    const data = localStorage.getItem(FORM_STORAGE_KEY);
    if (!data) {
      return getDefaultFormData();
    }
    
    const parsedData = JSON.parse(data);
    
    // Validate that we have all required fields
    return {
      ...getDefaultFormData(),
      ...parsedData,
    };
  } catch (error) {
    console.error('Failed to get form data from localStorage:', error);
    return getDefaultFormData();
  }
};

/**
 * Clear form data from localStorage
 */
export const clearFormData = (): boolean => {
  if (!isClient) return false;
  
  try {
    localStorage.removeItem(FORM_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear form data from localStorage:', error);
    return false;
  }
};

/**
 * Get default form data structure
 */
export const getDefaultFormData = (): FormData => ({
  name: '',
  email: '',
  company: '',
  position: '',
  title: '',
  tags: [],
  bannerImageUrl: '',
  article: '',
  currentStep: 1,
  lastUpdated: new Date().toISOString(),
});

/**
 * Check if form has any saved data
 */
export const hasStoredFormData = (): boolean => {
  if (!isClient) return false;
  
  try {
    const data = localStorage.getItem(FORM_STORAGE_KEY);
    if (!data) return false;
    
    const parsedData = JSON.parse(data);
    const defaultData = getDefaultFormData();
    
    // Check if any field has been modified from default
    return (
      parsedData.name !== defaultData.name ||
      parsedData.email !== defaultData.email ||
      parsedData.company !== defaultData.company ||
      parsedData.position !== defaultData.position ||
      parsedData.title !== defaultData.title ||
      parsedData.tags.length > 0 ||
      parsedData.article !== defaultData.article ||
      parsedData.bannerImageUrl !== defaultData.bannerImageUrl
    );
  } catch (error) {
    console.error('Failed to check stored form data:', error);
    return false;
  }
};

/**
 * Get the age of stored form data in hours
 */
export const getFormDataAge = (): number => {
  if (!isClient) return 0;
  
  try {
    const data = getFormData();
    if (!data.lastUpdated) return 0;
    
    const lastUpdated = new Date(data.lastUpdated);
    const now = new Date();
    const diffInMs = now.getTime() - lastUpdated.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    
    return Math.floor(diffInHours);
  } catch (error) {
    console.error('Failed to get form data age:', error);
    return 0;
  }
};
