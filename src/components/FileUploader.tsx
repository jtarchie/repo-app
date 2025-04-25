import { useState } from "preact/hooks";
import { DEFAULT_PASSWORD } from "../utils/crypto";
import { FileInput } from "./FileInput";
import { PasswordInput } from "./PasswordInput";
import { ActionButtons } from "./ActionButtons";

interface FileUploaderProps {
  onFileDecrypted: (jsonData: object, fileName: string) => void;
  onError: (error: Error) => void;
}

export const FileUploader = ({
  onFileDecrypted,
  onError,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [useDefaultPassword, setUseDefaultPassword] = useState<boolean>(true);
  const [password, setPassword] = useState<string>(DEFAULT_PASSWORD);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePasswordToggle = (useDefault: boolean) => {
    setUseDefaultPassword(useDefault);
    setPassword(useDefault ? DEFAULT_PASSWORD : "");
  };

  const handleReset = () => {
    setFile(null);
    setUseDefaultPassword(true);
    setPassword(DEFAULT_PASSWORD);
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
        <FileInput
          onChange={setFile}
          disabled={isLoading}
          fileName={file?.name || null}
        />

        <PasswordInput
          password={password}
          useDefaultPassword={useDefaultPassword}
          onPasswordChange={setPassword}
          onUseDefaultToggle={handlePasswordToggle}
          disabled={isLoading}
        />

        <ActionButtons
          onReset={handleReset}
          onDecrypt={handleDecrypt}
          isLoading={isLoading}
          isDecryptDisabled={!file || !password}
        />
      </div>
    </div>
  );
};
