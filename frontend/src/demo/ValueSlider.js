function ValueSlider(props) {
  return (
    <div className="w-75 d-flex flex-column align-items-center">
      <input type="range" value={props.value}
        className="w-75"
        min="1"
        max="150"
        onChange={props.handleChange}
        disabled={props.disabled}
        onMouseUp={props.onMouseUp ? (() => props.onMouseUp(props.value)) : null}
      />
      <p id="sv-display" className="m-0">{props.value}</p>
    </div>
  );
}

export default ValueSlider;