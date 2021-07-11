window.addEventListener("load", init);

function init() {
  console.log("Window loaded!");

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = 400;
  ctx.canvas.height = 300;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  fetch("/svd/example")
    .then(statusCheck)
    .then(res => res.json())
    .then(console.log)
    .catch(console.log);
}

async function statusCheck(response) {
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response;
}