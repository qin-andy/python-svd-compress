function Details(props) {
  return (
    <div id="details-box" class="d-none row mx-5 justify-content-center w-100">
      <div class="col d-flex align-items-center flex-column">
        <hr class="w-75" />
        <h4>Details</h4>
        <p>When stored as a matrix, space stored is approximately proportional to</p>
        <p>Singular Values: <span id="details-svs">300</span></p>
        <p>Original size: <span id="details-o-size">500x400</span></p>
        <p>Compressed size: <span id="details-n-size">3300-=-df</span></p>
        <p>Compression Ratio: <span id="details-ratio">kibby</span></p>
      </div>
    </div>
  );
}

export default Details;