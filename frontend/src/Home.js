import { Footer, About } from "./info";
import { Container, SectionHeading } from "./structure";
import { Demo } from "./demo";

function Home(props) {
  return (
    <Container>
      <Demo />
      <SectionHeading text="About the SVD" />
      <About />
      <Footer />
    </Container>
  );
}

export default Home;