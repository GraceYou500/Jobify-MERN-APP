const FormSelect = ({
  name,
  type,
  value,
  handleChange,
  labelText,
  options,
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-select'
      >
        {options.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
