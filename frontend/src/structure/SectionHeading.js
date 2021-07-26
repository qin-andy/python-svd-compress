function SectionHeading(props) {
  return (
    <div className="row px-5 justify-content-center w-100">
      <div className="col-lg-5 d-flex align-items-center flex-column">
        <hr className="w-75" />
        <h4>{props.text}</h4>
      </div>
    </div>
  );
}

export default SectionHeading;