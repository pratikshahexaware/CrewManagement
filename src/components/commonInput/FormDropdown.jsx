import React from "react";
import "./formInput.scss";

const Dropdowm = ({
  id,
  name,
  options,
  title,
  handleChange,
  selectedValue
}) => (
  <div className="formInput">
    <h1>{title}</h1>

    <select id={id} name={name} onChange={handleChange} value={selectedValue}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdowm;
