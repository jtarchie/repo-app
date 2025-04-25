import { useEffect, useState } from "preact/hooks";
import { DEFAULT_PASSWORD } from "../utils/crypto";
import { JSONEditor } from "./JSONEditor";
import { DownloadModal } from "./DownloadModal";
import { FileHeader } from "./FileHeader";
import { FileUploader } from "./FileUploader"; // Make sure this import exists

interface JSONViewerProps {
  data: object | null;
  fileName: string;
  onReset: () => void;
}

export const JSONViewer = ({ data, fileName, onReset }: JSONViewerProps) => {
  const [jsonData, setJsonData] = useState<object | null>(data);
  const [editableJson, setEditableJson] = useState<string>("");
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [useDefaultPassword, setUseDefaultPassword] = useState<boolean>(true);
  const [password, setPassword] = useState<string>(DEFAULT_PASSWORD);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState<boolean>(!!data);

  useEffect(() => {
    if (data) {
      setJsonData(data);
      setEditableJson(JSON.stringify(data, null, 2));
      setShowEditor(true);
    }
  }, [data]);

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;
    setEditableJson(value);

    // Validate JSON as user types
    try {
      JSON.parse(value);
      setJsonError(null);
    } catch (_error) {
      setJsonError("Invalid JSON format");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setUseDefaultPassword(checked);
    setPassword(checked ? DEFAULT_PASSWORD : "");
  };

  const handleReset = () => {
    setShowEditor(false);
    onReset(); // Call the original onReset handler
  };

  const handleDownload = async () => {
    try {
      // First validate and parse the current JSON from editor
      const updatedData = JSON.parse(editableJson);
      setJsonData(updatedData);
      setJsonError(null);

      setIsExporting(true);

      // Import the encryption function
      const { encryptES3 } = await import("../utils/crypto");

      // Encrypt the JSON
      const encryptedData = await encryptES3(
        editableJson, // Use the edited JSON directly
        useDefaultPassword ? DEFAULT_PASSWORD : password,
      );

      // Create blob and download
      const blob = new Blob([encryptedData], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = url;

      // Generate download filename - append ".edited" to the original filename
      const downloadName = fileName + ".edited";

      link.download = downloadName;
      link.click();

      // Clean up
      URL.revokeObjectURL(url);

      // Close the modal
      document.getElementById("download_modal")?.close();
    } catch (error) {
      if (error instanceof SyntaxError) {
        setJsonError("Invalid JSON format. Unable to download.");
      } else {
        alert(
          `Error exporting file: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        );
      }
    } finally {
      setIsExporting(false);
    }
  };

  if (!jsonData && showEditor) {
    return null;
  }

  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body p-4">
        {showEditor
          ? (
            <>
              <FileHeader
                fileName={fileName}
                jsonError={jsonError}
                onReset={handleReset}
                onDownload={() =>
                  document.getElementById("download_modal")?.showModal()}
                isDownloadDisabled={!!jsonError}
              />

              <JSONEditor
                value={editableJson}
                onChange={handleEditorChange}
              />
            </>
          )
          : <FileUploader />}
      </div>

      {showEditor && (
        <DownloadModal
          modalId="download_modal"
          useDefaultPassword={useDefaultPassword}
          password={password}
          onPasswordChange={handlePasswordChange}
          onCheckboxChange={handleCheckboxChange}
          onDownload={handleDownload}
          isExporting={isExporting}
        />
      )}
    </div>
  );
};
