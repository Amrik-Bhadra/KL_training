import React from "react";

interface UploadComponentProps {
  label: string;
  name: string;
  id: string;
  width?: string;
  required: boolean;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  preview: string | null;
  fileType?: string | null;
}

const UploadComponent = ({
  label,
  name,
  id,
  width = "100%",
  required,
  accept,
  onChange,
  error,
  preview,
  fileType,
}: UploadComponentProps) => {
  
  const renderPreview = () => {
    if (!preview || !fileType) return null;

    if (fileType.startsWith("image/")) {
      return (
        <img
          src={preview}
          alt="preview"
          className="mt-2 w-32 h-32 object-cover rounded"
        />
      );
    }

    if (fileType === "application/pdf") {
      return (
        <iframe
          src={preview}
          title="PDF preview"
          className="mt-2 w-32 h-32 border rounded"
        />
      );
    }
  };

  return (
    <div className="form-field" style={{ width: `${width}` }}>
      <label htmlFor={id} className="flex gap-x-1">
        {label} {required && <p className="text-red-600">*</p>}
      </label>
      <input
        type="file"
        accept={accept}
        name={name}
        id={id}
        onChange={onChange}
      />
      {renderPreview()}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UploadComponent;
