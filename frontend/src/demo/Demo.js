import { useState } from 'react';

import CalculateForm from "./CalculateForm";
import Canvas from "./Canvas";
import Details from "./Details";
import Gallery from "./Gallery";
import GalleryImage from "./GalleryImage";
import ValueSlider from "./ValueSlider";

function Demo(props) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [calculated, setCalculated] = useState(false);

  function dummyRenderRGB(rgb) {
    console.log(rgb);
  }

  function dummyRenderImg(src) {
    console.log("Dummy rendering img!");
    setSelected(true);
    setCalculated(false);
  }

  function dummyUpload(query) {
    console.log("Dummy upload!");
    setSelected(false);
    setLoading(true);
    setCalculated(false);
    setTimeout(() => {
      setSelected(false);
      setLoading(false);
      setCalculated(true);
    }, 500)
  }

  function dummyRecalculate(value) {
    console.log("Dummy recalculate!");
    setSelected(false);
    setLoading(true);
    setTimeout(() => {
      setSelected(false);
      setLoading(false);
    }, 500)
  }

  return (
    <div className="row justify-content-center w-100">
      <div className="col d-flex align-items-center flex-column">
        <h1 className="mt-3 mb-4 text-center">Web SVD Compress</h1>
        <Canvas id="canvas" width="600" height="400" />
        <Gallery>
          <GalleryImage src="images/bridge.png" alt="Bridge" onClick={dummyRenderImg} disabled={loading} />
          <GalleryImage src="images/city.png" alt="City" onClick={dummyRenderImg} disabled={loading} />
          <GalleryImage src="images/horizon.png" alt="Horizon" onClick={dummyRenderImg} disabled={loading} />
          <GalleryImage src="images/shore.png" alt="Shore" onClick={dummyRenderImg} disabled={loading} />
        </Gallery>
        <h5 className="m-0">Singular Values</h5>
        <ValueSlider disabled={!calculated} onMouseUp={dummyRecalculate} />
        <hr className="w-75" />
        <h4>Custom Image</h4>
        <CalculateForm
          calcDisabled={!selected}
          fileDisabled={loading}
          loading={loading}
          onFileChange={dummyRenderImg}
          onSubmit={dummyUpload}
        />
        <Details />
      </div>
    </div>
  );
}

export default Demo;