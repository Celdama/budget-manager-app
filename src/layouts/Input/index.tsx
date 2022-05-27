import { ReactElement } from 'react';

interface InputsProps {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const Input = ({
  type,
  name,
  value,
  placeholder,
  onChange,
}: InputsProps): ReactElement => (
  <input
    className="outline m-4"
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e)}
  />
);
