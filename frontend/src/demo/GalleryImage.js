import { useRef } from "react";

function GalleryImage(props) {
  const fullImg = useRef(null);
  function handleClick(e) {
    if (!fullImg.current) {
      let newImg = new Image();
      newImg.src = e.target.src;
      newImg.onload = () => {
        fullImg.current = newImg;
        props.onClick(fullImg.current);
      }
    } else {
      props.onClick(fullImg.current);
    }
  }

  return (
    <img
      className={"m-1 img-fluid gallery rounded" + (props.disabled ? "" : " enabled")}
      onClick={props.loading ? null : handleClick}
      src={props.src}
      alt={props.alt}
    />
  );
}

export default GalleryImage;