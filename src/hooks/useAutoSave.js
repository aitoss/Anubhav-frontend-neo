import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'article_draft';
const AUTO_SAVE_INTERVAL = 10000; // 10 seconds

export const useAutoSave = (formData, articleContent, step) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const intervalRef = useRef(null);

  // Check for existing draft on mount
  useEffect(() => {
    const existingDraft = localStorage.getItem(STORAGE_KEY);
    if (existingDraft) {
      try {
        const parsed = JSON.parse(existingDraft);
        // Only show restore prompt if there's actual content
        if (parsed.formData && (
          parsed.formData.name || 
          parsed.formData.email || 
          parsed.formData.company || 
          parsed.formData.position || 
          parsed.formData.title ||
          parsed.articleContent ||
          (parsed.tags && parsed.tags.length > 0)
        )) {
          setShowRestorePrompt(true);
        }
      } catch (error) {
        console.error('Error parsing saved draft:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Auto-save function
  const saveDraft = useCallback(() => {
    const draftData = {
      formData,
      articleContent,
      tags: formData.tags || [],
      step,
      timestamp: Date.now()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  }, [formData, articleContent, step]);

  // Restore draft function
  const restoreDraft = useCallback(() => {
    const existingDraft = localStorage.getItem(STORAGE_KEY);
    if (existingDraft) {
      try {
        const parsed = JSON.parse(existingDraft);
        return parsed;
      } catch (error) {
        console.error('Error parsing saved draft:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return null;
  }, []);

  // Clear draft function
  const clearDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasUnsavedChanges(false);
    setShowRestorePrompt(false);
    setLastSaved(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Auto-save effect
  useEffect(() => {
    // Only auto-save if there's actual content
    const hasContent = 
      formData.name || 
      formData.email || 
      formData.company || 
      formData.position || 
      formData.title ||
      articleContent ||
      (formData.tags && formData.tags.length > 0);

    if (hasContent) {
      setHasUnsavedChanges(true);
      
      // Clear existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Set new interval
      intervalRef.current = setInterval(() => {
        saveDraft();
      }, AUTO_SAVE_INTERVAL);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    } else {
      setHasUnsavedChanges(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [formData, articleContent, saveDraft]);

  // Save on beforeunload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        saveDraft();
        // Show browser's default "leave site" dialog
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges, saveDraft]);

  return {
    hasUnsavedChanges,
    showRestorePrompt,
    setShowRestorePrompt,
    lastSaved,
    saveDraft,
    restoreDraft,
    clearDraft
  };
}; 