import { FunctionComponent } from "preact";

interface DownloadModalProps {
  modalId: string;
  useDefaultPassword: boolean;
  password: string;
  onPasswordChange: (value: string) => void;
  onCheckboxChange: (checked: boolean) => void;
  onDownload: () => void;
  isExporting: boolean;
}

export const DownloadModal: FunctionComponent<DownloadModalProps> = ({
  modalId,
  useDefaultPassword,
  password,
  onPasswordChange,
  onCheckboxChange,
  onDownload,
  isExporting,
}) => {
  const handlePasswordChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    onPasswordChange(target.value);
  };

  const handleCheckboxChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    onCheckboxChange(target.checked);
  };

  return (
    <dialog id={modalId} className="modal">
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
            onClick={onDownload}
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
  );
};
