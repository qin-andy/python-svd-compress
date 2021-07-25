function About(props) {
  return (
    <div class="row px-5 justify-content-center w-100">
      <div class="col-lg-5 d-flex align-items-center flex-column">
        <p class="text-left">
          An interactive demo showcasing how the singular value decomposition can be applied to image compression.
        </p>
        <p>
          In linear alebgra, the <i>singular value decomposition</i> of an matrix A of size m x n is a factorization
          of the matrix in the form A-UΣV*, where U is m x m, Σ is m x n, and V* (or V transpose) is n x n. The diagonal
          entries of Σ, also known as the singular values of the matrix, are ordered from greatest to least. This allows
          for a low rank approximation of A of by selecting the first k columns of U, entries of Σ, and rows of V*
          and multiplying them back together, resulting in an m x n matrix of rank k.
        </p>
        <p class="text-left">
          By decomposing an image into its 3 color channels, we can represent an image as 3 separate matricies
          of the form M = UΣV*. In this sense,
          After constructing an SVD for each channel, the image can be "compressed" by calculating a low rank
          approximation for each color. Each image represented by an m x k matrix
          stores <b>3*m*n</b> different values, one for each pixel, to resconstruct the matrix; however, the low rank
          approximation of rank k uses the product of an m x k matrix, k singular values, and a k x n matrix for each
          color channel, which can me stored as <b>3*(m*k + k + n*k)</b> values. For low values of k, this saves space
          at the cost of image quality. The slider determines the rank of the low rank approximation
        </p>
        <p>
          Note that this application of the SVD assumes that color channel values are stored without any optimization.
          This is largely agnostic to the reality of physical storage implementations. In addition,
          the computation of an SVD is an expensive operation, making this method less practical, but still an interesting
          exploration of the SVD's applications.
        </p>
      </div>
      <div class="col-lg-5 d-flex align-items-center flex-column">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Singular_value_decomposition_visualisation.svg/800px-Singular_value_decomposition_visualisation.svg.png"
          alt="a diagram of an svd" class="img-fluid" />
        <cite>By Cmglee - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=67853297</cite>
      </div>
    </div>
  );
}

export default About;