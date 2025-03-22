'use client';

import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef } from 'react';

type EditableCellProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export function EditableCell({ value, onChange }: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const handleSave = () => {
    setEditing(false);
    if (internalValue !== value) {
      onChange(internalValue);
    }
  };

  return !editing ? (
    <Input
      ref={inputRef}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSave();
        }
        if (e.key === 'Escape') {
          setInternalValue(value);
          setEditing(false);
        }
      }}
      className='border-none p-5 rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative'
    />
  ) : (
    <div
      className='flex space-x-2 p-5'
      onClick={() => setEditing(true)}
      onKeyDown={() => setEditing(true)}
      title='Click to edit'
    >
      {value}
    </div>
  );
}
