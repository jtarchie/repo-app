import { useState } from "preact/hooks";
import { FileUploader } from "../../components/FileUploader";
import { JSONViewer } from "../../components/JSONViewer";

export function Home() {
  const [jsonData, setJsonData] = useState<object | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleFileDecrypted = (data: object, name: string) => {
    setJsonData(data);
    setFileName(name);
    setError(null);
  };

  const handleError = (err: Error) => {
    setError(err.message);
    setJsonData(null);
  };

  const handleReset = () => {
    setJsonData(null);
    setFileName("");
    setError(null);
  };

  return (
    <>
      <main className="max-w-full w-full px-4 py-6 container mx-auto">
        {error && (
          <div className="alert alert-error mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Show the uploader only if no json data is loaded */}
        {!jsonData
          ? (
            <FileUploader
              onFileDecrypted={handleFileDecrypted}
              onError={handleError}
            />
          )
          : (
            <JSONViewer
              data={jsonData}
              fileName={fileName}
              onReset={handleReset}
            />
          )}
      </main>

      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <div>
          <p className="text-sm">
            REPO Save File Decryptor - Client-side decryption, your data never
            leaves your browser
          </p>
        </div>
      </footer>
    </>
  );
}
