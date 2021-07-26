import { useState } from "react";

function ValueSlider(props) {
  const [value, setValue] = useState(10);
  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="w-75 d-flex flex-column align-items-center">
      <input type="range" value={value}
        className="w-75"
        min="1"
        max="150"
        onChange={handleChange}
        disabled={props.disabled}
        onMouseUp={props.onMouseUp}
      />
      <p id="sv-display" className="m-0">{value}</p>
    </div>
  );
}

export default ValueSlider;