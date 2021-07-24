import About from "./About";
import CalculateForm from "./CalculateForm";
import Canvas from "./Canvas";
import Container from "./Container";
import Details from "./Details";
import Footer from "./Footer";
import Gallery from "./Gallery";
import GalleryImage from "./GalleryImage";
import ValueSlider from "./ValueSlider";

function Home(props) {
  return (
    <Container>
      <div class="row justify-content-center w-100">
        <div class="col d-flex align-items-center flex-column">
          <h1 class="mt-3 mb-4 text-center">Web SVD Compress</h1>
          <Canvas id="canvas" class="shadow-lg" width="600" height="400" />
          <Gallery>
            <GalleryImage id="example-0" src="images/bridge.png" alt="Bridge" />
            <GalleryImage id="example-1" src="images/city.png" alt="City" />
            <GalleryImage id="example-2" src="images/horizon.png" alt="Horizon" />
            <GalleryImage id="example-3" src="images/shore.png" alt="Shore" />
          </Gallery>
          <h5 class="m-0">Singular Values</h5>
          <ValueSlider />
          <hr class="w-75" />
          <h4>Custom Image</h4>
          <CalculateForm />
        </div>
      </div>
      <Details />
      <div class="row px-5 justify-content-center w-100">
        <div class="col-lg-5 d-flex align-items-center flex-column">
          <hr class="w-75" />
          <h4>About the SVD</h4>
        </div>
      </div>
      <About />
      <Footer />
    </Container>
  );
}

export default Home;