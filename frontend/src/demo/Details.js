function Details(props) {
  let height = props.height;
  let width = props.width;
  let svs = props.svs;

  return (
    <div id="details-box" className={"row mx-5 justify-content-center w-100" + (props.disabled ? " d-none" : "")}>
      <div className="col d-flex align-items-center flex-column">
        <hr className="w-75" />
        <h4>Details</h4>
        <p>When stored as a matrix, space stored is approximately proportional to</p>
        <p>Singular Values: <span>{"" + props.svs}</span></p>
        <p>Original size: <span>{"3x" + width + "x" + height + " = " + 3 * width * height + " values"}</span></p>
        <p>Compressed size: <span>
          {height + "x" + svs + " + " + svs + " + "
            + svs + "x" + width + " = " + (height * svs + width * svs + svs) + " values"}
        </span></p>
        <p>Compression Ratio: <span>{(height * svs + width * svs + svs) / (3 * width * height) + ""}</span></p>
      </div>
    </div>
  );
}

export default Details;