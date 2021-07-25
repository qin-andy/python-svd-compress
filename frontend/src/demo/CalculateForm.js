function CalculateForm(props) {
  return (
    <form id="image-upload" class="d-flex flex-column align-items-center">
      <div class="custom-file m-3">
        <input id="file-input" type="file" class="custom-file-input" accept=".png,.jpg" id="customFile" />
        <label id="file-label" class="custom-file-label" for="customFile">Choose file</label>
      </div>

      <button id="upload-btn" class="btn btn-primary-outline border-primary">
        <span id="upload-spinner" class="spinner-border spinner-border-sm d-none" role="status"></span>
        Calculate
      </button>
    </form>
  );
}

export default CalculateForm;