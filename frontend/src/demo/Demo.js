import { useState } from 'react';

import CalculateForm from "./CalculateForm";
import Canvas from "./Canvas";
import Details from "./Details";
import Gallery from "./Gallery";
import GalleryImage from "./GalleryImage";
import ValueSlider from "./ValueSlider";

import { sendImage, recalculateImg } from '../adapters/api';
import Alert from './Alert';

function Demo(props) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const [canvasImage, setCanvasImage] = useState(undefined);
  const [sliderValue, setSliderValue] = useState(10);

  const [error, setError] = useState();


  function renderNewImg(img) {
    setSelected(true);
    setCalculated(false);
    setCanvasImage(img);
  }

  function calculateSVD() {
    setSelected(false);
    setLoading(true);
    setCalculated(false);
    sendImage(canvasImage, sliderValue)
      .then((img) => {
        setCanvasImage(img);
        setError(undefined);
      })
      .catch(handleErr)
      .finally(() => {
        setSelected(false);
        setLoading(false);
        setCalculated(true);
      });
  }

  function recalculate(value) {
    setSelected(false);
    setLoading(true);

    recalculateImg(value)
      .then((img) => {
        setCanvasImage(img);
        setError(undefined);
      })
      .catch(handleErr)
      .finally(() => {
        setSelected(false);
        setLoading(false);
      });
  }

  function handleSliderChange(e) {
    setSliderValue(e.target.value);
  }

  function handleErr(err) {
    setLoading(true);
    console.log("Handling err!");
    console.log(err);
    setError({
      message: err.message,
      code: err.code
    });
  }

  return (
    <div className="row justify-content-center w-100">
      <div className="col d-flex align-items-center flex-column">
        <h1 className="mt-3 mb-4 text-center">Web SVD Compress</h1>
        <Alert disabled={!error} errorMessage={error?.message} errorCode={error?.code} />
        <Canvas id="canvas" width="600" height="400" img={canvasImage} />
        <Gallery>
          <GalleryImage src="static/images/bridge.png" alt="Bridge" onClick={renderNewImg} disabled={loading} />
          <GalleryImage src="static/images/city.png" alt="City" onClick={renderNewImg} disabled={loading} />
          <GalleryImage src="static/images/horizon.png" alt="Horizon" onClick={renderNewImg} disabled={loading} />
          <GalleryImage src="static/images/shore.png" alt="Shore" onClick={renderNewImg} disabled={loading} />
        </Gallery>
        <h5 className="m-0">Singular Values</h5>
        <ValueSlider
          disabled={loading}
          handleChange={handleSliderChange}
          onMouseUp={calculated ? recalculate : null}
          value={sliderValue}
        />
        <hr className="w-75" />
        <h4>Custom Image</h4>
        <CalculateForm
          calcDisabled={!selected}
          fileDisabled={loading}
          loading={loading}
          onFileChange={renderNewImg}
          onSubmit={calculateSVD}
          img={canvasImage}
        />
        <Details disabled={!calculated || loading} width={canvasImage?.width} height={canvasImage?.height} svs={sliderValue}/>
      </div>
    </div>
  );
}

export default Demo;