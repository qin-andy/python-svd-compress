import { useState } from "react";

function CalculateForm(props) {
  const [fileName, setFileName] = useState(null);

  function handleFileChange(e) {
    console.log("changed!");
    setFileName(e.target.files[0].name);
    let img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => props.onFileChange(img);
    console.log(e.target.files[0].name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
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