import React from 'react';
import './input-field.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
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
  required = false
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
        className={`input ${error ? 'input-error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
      />
      {error && (
        <div id={`${id}-error`} className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
