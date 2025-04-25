interface ActionButtonsProps {
  onReset: () => void;
  onDecrypt: () => void;
  isLoading: boolean;
  isDecryptDisabled: boolean;
}

export const ActionButtons = ({
  onReset,
  onDecrypt,
  isLoading,
  isDecryptDisabled,
}: ActionButtonsProps) => {
  return (
    <div className="card-actions justify-end mt-6">
      <button
        type="button"
        onClick={onReset}
        disabled={isLoading}
        className="btn btn-outline"
      >
        Reset
      </button>
      <button
        type="button"
        onClick={onDecrypt}
        disabled={isDecryptDisabled || isLoading}
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
  );
};
