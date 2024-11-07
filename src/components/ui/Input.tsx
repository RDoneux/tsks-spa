import { ChangeEvent, useRef } from 'react';

interface InputProps {
  value: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  label: string;
}

export default function Input({ value, onChange, type, label }: InputProps) {
  const id = useRef<string>(crypto.randomUUID());
  return (
    <label
      htmlFor={id.current}
      className="relative block overflow-hidden rounded border border-gray-400 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        type={type}
        id={id.current}
        placeholder="Ticket Name"
        className="peer h-8 w-full border-none rounded bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        onChange={onChange}
        value={value}
      />

      <span className="absolute start-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
        {label}
      </span>
    </label>
  );
}
