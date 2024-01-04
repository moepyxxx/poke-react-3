import { FC } from "react";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

export const InputText: FC<Props> = ({ label, name, value, onChange }) => {
  return (
    <div className="min-w-64">
      <div className="mb-2">
        <label htmlFor={name}>{label}</label>
      </div>
      <input
        className="bg-thin-gray border border-gray rounded-md p-2 w-full"
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
