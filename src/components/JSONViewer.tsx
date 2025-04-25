import { useEffect, useState } from "preact/hooks";
import Editor from "@monaco-editor/react";
import { DEFAULT_PASSWORD } from "../utils/crypto";

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

  useEffect(() => {
    if (data) {
      setJsonData(data);
      setEditableJson(JSON.stringify(data, null, 2));
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

  const handleSaveChanges = () => {
    try {
      const updatedData = JSON.parse(editableJson);
      setJsonData(updatedData);
      setJsonError(null);
    } catch (_error) {
      setJsonError("Invalid JSON format. Unable to save changes.");
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

  const handleDownload = async () => {
    if (!jsonData) return;

    try {
      setIsExporting(true);

      // Import the encryption function
      const { encryptES3 } = await import("../utils/crypto");

      // Convert JSON object to string
      const jsonString = JSON.stringify(jsonData);

      // Encrypt the JSON
      const encryptedData = await encryptES3(
        jsonString,
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

      // Generate download filename (replace extension with .save if it exists)
      const downloadName = fileName.includes(".")
        ? fileName.substring(0, fileName.lastIndexOf(".")) + ".save"
        : fileName + ".save";

      link.download = downloadName;
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(
        `Error exporting file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    } finally {
      setIsExporting(false);
    }
  };

  if (!jsonData) {
    return null;
  }

  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-70">{fileName}</span>
            {jsonError && (
              <div className="badge badge-error gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  >
                  </path>
                </svg>
                {jsonError}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onReset}
              className="btn btn-outline btn-sm"
            >
              Upload New File
            </button>
            <button
              type="button"
              onClick={handleSaveChanges}
              className="btn btn-primary btn-sm"
              disabled={!!jsonError}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() =>
                document.getElementById("download_modal")?.showModal()}
              className="btn btn-accent btn-sm"
              disabled={!!jsonError}
            >
              Download
            </button>
          </div>
        </div>

        <div className="bg-base-300 rounded-lg overflow-hidden h-[75vh]">
          <Editor
            height="100%"
            defaultLanguage="json"
            value={editableJson}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              wordWrap: "on",
              formatOnPaste: true,
              formatOnType: true,
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      {/* Download Modal */}
      <dialog id="download_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Download Encrypted File</h3>

          <div className="form-control mt-4">
            <label className="label cursor-pointer">
              <span className="label-text">Use default password</span>
              <input
                type="checkbox"
                checked={useDefaultPassword}
                onChange={handleCheckboxChange}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Encryption password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              disabled={useDefaultPassword}
              className="input input-bordered w-full"
              placeholder="Enter custom password"
            />
            {useDefaultPassword && (
              <label className="label">
                <span className="label-text-alt">Using default password</span>
              </label>
            )}
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button type="button" className="btn btn-outline">Cancel</button>
            </form>
            <button
              type="button"
              onClick={handleDownload}
              disabled={!useDefaultPassword && !password.trim()}
              className="btn btn-primary"
            >
              {isExporting
                ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Encrypting...
                  </>
                )
                : (
                  "Download"
                )}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
