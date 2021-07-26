function GalleryImage(props) {
  return (
    <img
      className={"m-1 img-fluid gallery rounded" + (props.disabled ? "" : " enabled")}
      onClick={props.loading ? null : props.onClick}
      id={props.id}
      src={props.src}
      alt={props.alt}
    />
  );
}

export default GalleryImage;