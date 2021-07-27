import { useEffect, useRef } from 'react';

function Canvas(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let ctx = canvasRef.current.getContext('2d');
    ctx.canvas.width = props.width;
    ctx.canvas.height = props.height;
  }, []);

  useEffect(() => {
    if (props.img) {
      let ctx = canvasRef.current.getContext('2d');
      ctx.canvas.width = props.img.width;
      ctx.canvas.height = props.img.height;
      ctx.drawImage(props.img, 0, 0);

      console.log("Approximately " + props.img.src.length * 6 / 8000000 + "mb");
    }
  }, [props.img]);

  return (
    <canvas
      className="shadow-lg"
      ref={canvasRef}
    />
  );
}

export default Canvas;