import React from 'react';
import {Fragment} from 'react';

const FormInput = props => {
  const {
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    children,
    label,
    ...rest
  } = props;

  return (
    <Fragment>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          // className={className}
          className={'form-control' + className}
          style={error && {border: '1px solid red'}}
          {...rest}
        />
        {error && <small style={{color: 'red'}}>{error}</small>}
      </div>
    </Fragment>
  );
};

export default FormInput;
