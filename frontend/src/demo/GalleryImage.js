function GalleryImage(props) {
  return (
    <img class="m-1 img-fluid gallery rounded enabled"
      id={props.id} src={props.src} alt={props.alt} />
  );
}

export default GalleryImage;