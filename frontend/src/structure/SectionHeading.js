function SectionHeading(props) {
  return (
    <div class="row px-5 justify-content-center w-100">
      <div class="col-lg-5 d-flex align-items-center flex-column">
        <hr class="w-75" />
        <h4>{props.text}</h4>
      </div>
    </div>
  );
}

export default SectionHeading;