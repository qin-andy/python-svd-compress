import { useState } from "react";

function CalculateForm(props) {
  const [fileName, setFileName] = useState(null);
  const IMG_MAX_MB = 1203102

  function handleFileChange(e) {
    setFileName(e.target.files[0].name);

    let img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);

    img.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      img.onload = () => props.onFileChange(img);
      img.src = canvas.toDataURL();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if ((props.img.src.length * 6 / 8000000 ) > IMG_MAX_MB) {
      console.log("Approximately " + props.img.src.length * 6 / 8000000 + "mb");
      console.log("File too large!")
    } else {
      console.log("Approximately " + props.img.src.length * 6 / 8000000 + "mb");
      props.onSubmit();
    }
  }

  return (
    <form
      id="image-upload"
      className="d-flex flex-column align-items-center"
      onSubmit={handleSubmit}
    >
      <div className="custom-file m-3">
        <input
          type="file"
          className="custom-file-input"
          accept=".png,.jpg"
          disabled={props.fileDisabled}
          onChange={handleFileChange}
        />
        <label id="file-label" className="custom-file-label">{fileName || "Choose file"}</label>
      </div>
      <button
        type="submit"
        id="upload-btn"
        className="btn btn-primary-outline border-primary"
        disabled={props.calcDisabled}
      >
        {
          props.loading ? <span
            id="upload-spinner"
            className="spinner-border spinner-border-sm"
            role="status"
          /> : "Calculate"
        }
      </button>
    </form>
  );
}

export default CalculateForm;