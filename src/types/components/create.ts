export interface DragAndDropImageUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  setbannerImage: (url: string) => void;
  bannerImage: string;
  errors?: {
    file?: string;
  };
}
