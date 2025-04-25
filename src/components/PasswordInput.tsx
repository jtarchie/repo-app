interface PasswordInputProps {
  password: string;
  useDefaultPassword: boolean;
  onPasswordChange: (password: string) => void;
  onUseDefaultToggle: (useDefault: boolean) => void;
  disabled: boolean;
}

export const PasswordInput = ({
  password,
  useDefaultPassword,
  onPasswordChange,
  onUseDefaultToggle,
  disabled,
}: PasswordInputProps) => {
  const handlePasswordChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    onPasswordChange(target.value);
  };

  const handleCheckboxChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    onUseDefaultToggle(target.checked);
  };

  return (
    <div className="flex flex-wrap gap-6 mt-4">
      <div className="form-control flex-1 min-w-[300px]">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            checked={useDefaultPassword}
            onChange={handleCheckboxChange}
            className="checkbox checkbox-primary"
            disabled={disabled}
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
          disabled={useDefaultPassword || disabled}
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
  );
};
