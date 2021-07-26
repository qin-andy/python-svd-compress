function Gallery(props) {
  return (
    <div className="m-3 d-flex justify-content-center flex-row">
      {props.children}
    </div>
  );
}

export default Gallery;