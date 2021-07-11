window.addEventListener("load", init);

function init() {
  console.log("Window loaded!");

  // const canvas = document.getElementById("canvas");
  // const ctx = canvas.getContext("2d");
  // ctx.canvas.width = 400;
  // ctx.canvas.height = 300;

  // ctx.fillStyle = '#000000';
  // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  fetch("/svd/example")
    .then(statusCheck)
    .then(res => res.json())
    .then((json) => renderRGBOnCanvas(json.colors, json.shape[0], json.shape[1]))
    .catch(console.log);
}

function renderRGBOnCanvas(rgb, height, width) {
  console.log(rgb)
  console.log(height)
  console.log(width)
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  let imgData = new ImageData(width, height);
  let data = imgData.data;
  let count = 0;
  let index = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      index = (y*width + x) * 4
      data[index] = rgb[y][x][0];
      data[index + 1] = rgb[y][x][1];
      data[index+ 2] = rgb[y][x][2];
      data[index + 3] = 255;
    }
  }
  console.log("Finished rendering!");
  console.log("Wrote " + count + " pixels!");
  console.log(data.length)
  ctx.putImageData(imgData, 0, 0);
}

async function statusCheck(response) {
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response;
}