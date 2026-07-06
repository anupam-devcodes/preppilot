import React, { useState, useRef } from 'react';
import { Camera, X, UploadCloud } from 'lucide-react';

/**
 * Avatar uploader with file selection, size limits, and instant preview.
 */
const AvatarUploader = ({ onChange, error }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (limit: 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large. Maximum size is 2MB.");
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert("Only image files are allowed.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      
      onChange(file);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <span className="text-xs font-semibold text-dark-300 uppercase tracking-wider self-start">
        Profile Picture (Optional)
      </span>
      
      <div 
        onClick={triggerFileInput}
        className="group relative w-24 h-24 rounded-full border-2 border-dashed border-dark-800 hover:border-brand-500 bg-dark-900/40 flex items-center justify-center cursor-pointer transition-all hover:scale-102 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] overflow-hidden"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {previewUrl ? (
          <>
            <img 
              src={previewUrl} 
              alt="Avatar Preview" 
              className="w-full h-full object-cover"
            />
            {/* Overlay hover effect */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="h-6 w-6 text-white" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-dark-500 group-hover:text-brand-400 transition-colors">
            <UploadCloud className="h-6 w-6" />
            <span className="text-[10px] font-medium mt-1">Upload</span>
          </div>
        )}

        {/* Remove button */}
        {previewUrl && (
          <button
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1 border border-red-400 shadow-md cursor-pointer transition-colors"
            title="Remove Image"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      
      {error && (
        <span className="text-xs text-red-400 font-medium animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
};

export default AvatarUploader;
