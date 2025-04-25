import { useRef } from "preact/hooks";

interface FileInputProps {
  onChange: (file: File | null) => void;
  disabled: boolean;
  fileName: string | null;
}

export const FileInput = ({ onChange, disabled, fileName }: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const selectedFile = target.files?.[0] || null;
    onChange(selectedFile);
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-lg font-medium">
          Select encrypted file
        </span>
      </label>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled}
        className="file-input file-input-bordered w-full"
      />
      {fileName && (
        <label className="label">
          <span className="label-text-alt">Selected: {fileName}</span>
        </label>
      )}
    </div>
  );
};
