import { useRef, useState } from "preact/hooks";
import { DEFAULT_PASSWORD } from "../utils/crypto";

interface FileUploaderProps {
  onFileDecrypted: (jsonData: object, fileName: string) => void;
  onError: (error: Error) => void;
}

export const FileUploader = (
  { onFileDecrypted, onError }: FileUploaderProps,
) => {
  const [file, setFile] = useState<File | null>(null);
  const [useDefaultPassword, setUseDefaultPassword] = useState<boolean>(true);
  const [password, setPassword] = useState<string>(DEFAULT_PASSWORD);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const selectedFile = target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handlePasswordChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  };

  const handleCheckboxChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setUseDefaultPassword(target.checked);
    if (target.checked) {
      setPassword(DEFAULT_PASSWORD);
    } else {
      setPassword("");
    }
  };

  const handleReset = () => {
    setFile(null);
    setUseDefaultPassword(true);
    setPassword(DEFAULT_PASSWORD);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDecrypt = async () => {
    if (!file) {
      onError(new Error("Please select a file to decrypt"));
      return;
    }

    if (!password.trim()) {
      onError(new Error("Please enter a decryption password"));
      return;
    }

    try {
      setIsLoading(true);

      // Import dynamically to avoid issues with SSR
      const { decryptES3, parseJSON } = await import("../utils/crypto");

      // Read file as ArrayBuffer
      const fileBuffer = await file.arrayBuffer();

      // Decrypt the file
      const decryptedContent = await decryptES3(fileBuffer, password);

      // Parse JSON
      const jsonData = parseJSON(decryptedContent);

      // Pass the decrypted data up to parent component
      onFileDecrypted(jsonData, file.name);
    } catch (error) {
      onError(
        error instanceof Error ? error : new Error("An unknown error occurred"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body">
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
            disabled={isLoading}
            className="file-input file-input-bordered w-full"
          />
          {file && (
            <label className="label">
              <span className="label-text-alt">Selected: {file.name}</span>
            </label>
          )}
        </div>

        <div className="flex flex-wrap gap-6 mt-4">
          <div className="form-control flex-1 min-w-[300px]">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                checked={useDefaultPassword}
                onChange={handleCheckboxChange}
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Use default password</span>
            </label>
          </div>

          <div className="form-control flex-1 min-w-[300px]">
            <label className="label">
              <span className="label-text">Decryption password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              disabled={useDefaultPassword || isLoading}
              className="input input-bordered w-full"
              placeholder="Enter custom password"
            />
            {useDefaultPassword && (
              <label className="label">
                <span className="label-text-alt">Using default password</span>
              </label>
            )}
          </div>
        </div>

        <div className="card-actions justify-end mt-6">
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="btn btn-outline"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleDecrypt}
            disabled={!file || !password || isLoading}
            className="btn btn-primary"
          >
            {isLoading
              ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Decrypting...
                </>
              )
              : (
                "Decrypt File"
              )}
          </button>
        </div>
      </div>
    </div>
  );
};
