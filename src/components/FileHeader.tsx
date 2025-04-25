import { FunctionComponent } from "preact";

interface FileHeaderProps {
  fileName: string;
  jsonError: string | null;
  onReset: () => void;
  onDownload: () => void;
  isDownloadDisabled: boolean;
}

export const FileHeader: FunctionComponent<FileHeaderProps> = ({
  fileName,
  jsonError,
  onReset,
  onDownload,
  isDownloadDisabled,
}) => {
  return (
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
          onClick={onDownload}
          className="btn btn-accent btn-sm"
          disabled={isDownloadDisabled}
        >
          Download
        </button>
      </div>
    </div>
  );
};
