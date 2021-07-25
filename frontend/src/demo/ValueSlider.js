function ValueSlider(props) {
  return (
    <div class="w-75 d-flex flex-column align-items-center">
      <input type="range" value="10" class="w-75" min="1" max="150" id="sv-slider" />
      <p id="sv-display" class="m-0">10</p>
    </div>
  );
}

export default ValueSlider;