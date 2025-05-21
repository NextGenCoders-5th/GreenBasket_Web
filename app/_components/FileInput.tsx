import { UploadCloud } from "lucide-react";
import React, { useRef } from "react";

interface FileUploadButtonProps {
  onFileSelect: (file: File | null) => void;
  label?: string;
  accept?: string;
}

const FileUploadInput: React.FC<FileUploadButtonProps> = ({
  onFileSelect,
  label = "Upload Image",
  accept = "image/*",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <>
      <input
        type="file"
        accept={accept}
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-4 py-1.5 text-green-500 hover:text-green-600 border-[0.5px] border-green-500 hover:border-green-600 bg-green-50 hover:bg-green-50 rounded-lg shadow transition"
      >
        <UploadCloud className="text-base" />
        {label}
      </button>
    </>
  );
};

export default FileUploadInput;
