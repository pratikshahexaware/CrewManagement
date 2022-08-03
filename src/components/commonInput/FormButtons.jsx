import { useState } from "react";
import "./formInput.scss";

const FormButton = (props) => {
    const { type, className, value, onClick, style, disabled } = props;

    return (
        <button
          type={type ? type : "button"}
          className={className ? "btn " + className : "btn"}
          onClick={onClick ? onClick : null}
          style={style || null}
          value={value || null}
          disabled={disabled ? true : false}
        >
          {props.children}
        </button>
      );
};

export default FormButton;
