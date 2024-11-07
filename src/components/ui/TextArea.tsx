import { ChangeEvent, useRef } from 'react';

interface TextAreaProps {
  value: string | undefined;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export default function TextArea({
  value,
  onChange,
  placeholder
}: TextAreaProps) {
  const id = useRef<string>(crypto.randomUUID());

  return (
    <div>
      <label htmlFor="OrderNotes" className="sr-only">
        Order notes
      </label>

      <div className="overflow-hidden rounded border border-gray-200 shadow-sm">
        <textarea
          id={id.current}
          className="w-full resize-none border-none p-2 align-top focus:ring-0 sm:text-sm bg-transparent"
          rows={4}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        ></textarea>
      </div>
    </div>
  );
}
