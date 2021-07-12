window.addEventListener("load", init);

function init() {
  console.log("Window loaded!");
  id("upload-btn").disabled = true;
  id("file-input").addEventListener("change", handleFileChange);
  id("image-upload").addEventListener("submit", handleSubmit);
  // fetch("/svd/example")
  //   .then(statusCheck)
  //   .then(res => res.json())
  //   .then((json) => renderRGBOnCanvas(json.colors, json.shape[0], json.shape[1]))
  //   .catch(console.log);
}

function handleSubmit(e) {
  e.preventDefault();
  id("upload-btn").disabled = true;
  id("upload-spinner").classList.remove("d-none");
  let file = id("file-input").files[0];
  if (file) {
    let canvas = id("canvas");
    let ctx = canvas.getContext("2d");
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let formData = new FormData();
    formData.append("data", imgData.data);
    formData.append("width", canvas.width);
    formData.append("height", canvas.height);

    fetch('/upload/image', { method: "POST", body: formData })
      .then(statusCheck)
      .then(res => res.json())
      .then((json) => renderRGBOnCanvas(json.colors, json.shape[0], json.shape[1]))
      .catch(console.log)
      .finally(() => id("upload-spinner").classList.add("d-none"))
  } else {
    console.log("Missing file!");
  }
}

function handleFileChange(e) {
  let label = id("file-label");
  if (this.files.length >= 1) {
    id("upload-btn").disabled = false;
    label.textContent = this.files[0].name;
    let img = new Image();
    img.src = URL.createObjectURL(this.files[0]);
    img.addEventListener("load", () => renderImageOnCanvas(img));
  } else {
    id("upload-btn").disabled = true;
    label.textContet = "Choose file";
  }
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
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  let imgData = new ImageData(width, height);
  let data = imgData.data;
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

function id(element) {
  return document.getElementById(element);
}