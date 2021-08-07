import React from 'react'

type InputProps = {
  type: string;
  name?: string;
  label?: string
  className: string;
  placeholder?: string;
  value: string;
  errorMessage?: string;
  onChange: (event: any) => void;

}

const Input = (props: InputProps) => {
  const { label, type, name, className, placeholder, value, errorMessage, onChange } = props;
  return (
    <>
      {label && <label>{label}</label>}
      <input type={type} name={name} className={className} placeholder={placeholder} value={value} onChange={onChange} />
      <div className="error-msg">{errorMessage}</div>
    </>
  );
}
export default Input;