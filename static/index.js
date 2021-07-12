window.addEventListener("load", init);

function init() {
  console.log("Window loaded!");
  document.getElementById("file-input").addEventListener("change", handleFileChange);
  document.getElementById("image-upload").addEventListener("submit", handleSubmit);

  fetch("/svd/example")
    .then(statusCheck)
    .then(res => res.json())
    .then((json) => renderRGBOnCanvas(json.colors, json.shape[0], json.shape[1]))
    .catch(console.log);
}

function handleSubmit(e) {
  e.preventDefault();
  let file = document.getElementById("file-input").files[0];
  if (file) {
    let formData = new FormData();
    console.log(file);
    formData.append("image", file, file.name);
    formData.append("name", "Kibby");
    fetch('/upload/image', { method: "POST", body: formData })
      .then(console.log);
    console.log("Form submitted!");
  } else {
    console.log("Missing file!");
  }
}

function handleFileChange(e) {
  let label = document.getElementById("file-label");
  if (this.files.length >= 1) {
    label.textContent = this.files[0].name;
    let img = new Image();
    img.src = URL.createObjectURL(this.files[0]);
    img.addEventListener("load", () => renderImageOnCanvas(img));
  } else {
    label.textContet = "Choose file";
  }
}

function renderImageOnCanvas(img) {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}


function renderRGBOnCanvas(rgb, height, width) {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  let imgData = new ImageData(width, height);
  let data = imgData.data;
  let count = 0;
  let index = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      index = (y * width + x) * 4
      data[index] = rgb[y][x][0];
      data[index + 1] = rgb[y][x][1];
      data[index + 2] = rgb[y][x][2];
      data[index + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

async function statusCheck(response) {
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response;
}