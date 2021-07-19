window.addEventListener("load", init);

let selected = "custom";
let calculated = false;

function init() {
  console.log("Window loaded!");
  id("upload-btn").disabled = true;
  id("file-input").addEventListener("change", handleFileChange);
  id("image-upload").addEventListener("submit", handleSubmit);

  id("sv-slider").addEventListener("input", handleSliderInput);
  id("sv-slider").addEventListener("change", handleSliderChange);

  // Add listeners for gallery images
  document.querySelectorAll(".gallery").forEach(element => {
    element.addEventListener("click", handleExampleClick);
  });
}

function handleExampleClick(e) {
  selected = e.target.id.split("-")[1];
  let newImg = new Image();
  newImg.src = e.target.src;
  newImg.addEventListener("load", () => {
    calculated = false;
    renderImageOnCanvas(newImg);
    id("upload-btn").disabled = false;
  });
}

function handleSliderInput(e) {
  id("sv-display").textContent = e.target.value;
}

function handleSliderChange(e) {
  if (calculated) {
    disableUiElements();
    id("upload-spinner").classList.remove("d-none");
    fetchRender("/recalculate" + "?svs=" + e.target.value + "&selected=" + selected);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  // Handle Ui
  disableUiElements();
  id("upload-spinner").classList.remove("d-none");

  if (true) {
    // Append data
    let formData = new FormData();
    // formData.append("data", getCanvasData().data);

    
    formData.append("data64", id("canvas").toDataURL())
    formData.append("width", canvas.width);
    formData.append("height", canvas.height);
    query = "?svs=" + id("sv-slider").value;

    // Make request
    fetchRender('/upload/image' + query, { method: "POST", body: formData });
  } else {
    let url = "/svd/example/" + selected + "?svs=" + id("sv-slider").value;
    fetchRender(url);
  }
}

function handleFileChange(e) {
  calculated = false;
  let label = id("file-label");
  if (this.files.length == 1) { // If there is a file selected
    id("upload-btn").disabled = false;

    // Render Image on Canvas
    label.textContent = this.files[0].name;
    let img = new Image();
    img.src = URL.createObjectURL(this.files[0]);
    img.addEventListener("load", () => renderImageOnCanvas(img));

    // Set selected
    selected = "custom";
  } else { // No file selected
    id("upload-btn").disabled = true;
    label.textContent = "Choose file";
  }
}

function fetchRender(url, options) {
  disableUiElements();
  id("upload-spinner").classList.remove("d-none");
  fetch(url, options)
    .then(statusCheck)
    .then(res => res.json())
    .then((json) => {
      updateDetails(json.shape[1], json.shape[0], json.svs);
      renderRGBOnCanvas(json.colors, json.shape[0], json.shape[1]);
      calculated = true;
    })
    .catch(handleError)
    .finally(() => {
      id("upload-spinner").classList.add("d-none");
      enableUiElements();
    });
}

function getCanvasData() {
  let ctx = id("canvas").getContext("2d");
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function renderImageOnCanvas(img) {
  let canvas = id("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
}

function renderRGBOnCanvas(rgb, height, width) {
  let canvas = id("canvas");
  let ctx = canvas.getContext("2d");

  let img = new Image();
  img.addEventListener("load", () => {
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  });
  img.src = "data:image/png;base64," + rgb;

  // let imgData = new ImageData(width, height);
  // let data = imgData.data;
  // let index = 0;
  // for (let y = 0; y < height; y++) {
  //   for (let x = 0; x < width; x++) {
  //     index = (y * width + x) * 4
  //     data[index] = rgb[y][x][0];
  //     data[index + 1] = rgb[y][x][1];
  //     data[index + 2] = rgb[y][x][2];
  //     data[index + 3] = 255;
  //   }
  // }
  // ctx.putImageData(imgData, 0, 0);
}

function updateDetails(width, height, svs) {
  id("details-box").classList.remove("d-none");
  id("details-svs").textContent = svs;
  id("details-o-size").textContent = "3x" + width + "x" + height + " = "
    + 3 * width * height + " values";
  id("details-n-size").textContent = height + "x" + svs + " + " + svs + " + "
    + svs + "x" + width + " = " + (height * svs + width * svs + svs) + " values";
  id("details-ratio").textContent = (height * svs + width * svs + svs) / (3 * width * height);
}

function disableUiElements() {
  id("sv-slider").disabled = true;
  id("file-input").disabled = true;
  id("upload-btn").disabled = true;
  document.querySelectorAll(".gallery").forEach(element => {
    element.classList.remove("enabled");
  });
}

function enableUiElements() {
  id("sv-slider").disabled = false;
  id("file-input").disabled = false;
  document.querySelectorAll(".gallery").forEach(element => {
    element.classList.add("enabled");
  });
}

function handleError(err) {
  console.log(err);
}

async function statusCheck(response) {
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response;
}

function id(element) {
  return document.getElementById(element);
}