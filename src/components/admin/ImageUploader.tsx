import { ChangeEvent } from 'react';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void; 
}

export default function ImageUploader({ onFileSelect }: ImageUploaderProps) {
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    onFileSelect(file);
    
    event.target.value = ''; 
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*, video/*" 
        onChange={handleFileChange} 
      />
    </div>
  );
}