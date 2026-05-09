import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'article_draft';
const AUTO_SAVE_INTERVAL = 10000; // 10 seconds

const hasFormContent = (formData = {}) =>
  Boolean(
    formData.company ||
    formData.companyId ||
    formData.position ||
    formData.title ||
    (formData.tags && formData.tags.length > 0)
  );

export const useAutoSave = (formData, articleContent, step, bannerImage = null, enabled = true) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const intervalRef = useRef(null);

  // Check for existing draft on mount
  useEffect(() => {
    if (!enabled) return;
    const existingDraft = localStorage.getItem(STORAGE_KEY);
    if (existingDraft) {
      try {
        const parsed = JSON.parse(existingDraft);
        if (parsed.formData && (
          hasFormContent(parsed.formData) ||
          parsed.articleContent
        )) {
          setShowRestorePrompt(true);
        }
      } catch (error) {
        console.error('Error parsing saved draft:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [enabled]);

  // Auto-save function
  const saveDraft = useCallback(() => {
    if (!enabled) return;
    const draftData = {
      formData,
      articleContent,
      tags: formData.tags || [],
      step,
      bannerImage,
      timestamp: Date.now()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  }, [formData, articleContent, step, bannerImage, enabled]);

  const restoreDraft = useCallback(() => {
    const existingDraft = localStorage.getItem(STORAGE_KEY);
    if (existingDraft) {
      try {
        return JSON.parse(existingDraft);
      } catch (error) {
        console.error('Error parsing saved draft:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return null;
  }, []);

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

  useEffect(() => {
    if (!enabled) {
      setHasUnsavedChanges(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const hasContent = hasFormContent(formData) || Boolean(articleContent);

    if (hasContent) {
      setHasUnsavedChanges(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
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
  }, [formData, articleContent, saveDraft, enabled]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        saveDraft();
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
