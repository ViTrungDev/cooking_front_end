import React from 'react';

function InputField({ name, placeholder, type, value, onChange }) {
    return (
        <input
            name={name}
            placeholder={placeholder}
            type={type || 'text'}
            onChange={onChange}
            value={value}
        />
    );
}
export default InputField;
