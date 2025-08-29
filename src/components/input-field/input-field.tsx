import React from 'react';
import './input-field.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  dirty?: boolean;
}

const InputField = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  dirty = false
}: InputFieldProps) => {
  return (
    <div className="input-field">
      <label htmlFor={id} className="input-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${(error && dirty) ? 'input-error' : ''}`}
        aria-invalid={!!error && dirty}
        required={required}
      />
      {(error && dirty) && (
        <div id={`${id}-error`} className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
