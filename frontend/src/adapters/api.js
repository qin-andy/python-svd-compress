export async function sendImage(img) {
  let formData = new FormData();

  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  formData.append("data64", canvas.toDataURL());
  console.log(canvas.toDataURL());
  formData.append("width", canvas.width);
  formData.append("height", canvas.height);
  let query = "?svs=" + 10;

  // Make request
  let newImg = await toAPI('/upload/image' + query, { method: "POST", body: formData });
  return newImg
}

async function toAPI(url, options) {
  return await fetch(url, options)
    .then(statusCheck)
    .then(res => res.json())
    .then((json) => {
      let img = new Image();
      img.src = "data:image/png;base64," + json.colors;
      return img;
    })
    .catch(handleError)
    .finally((img) => {
      console.log("completed");
      return img || "error";
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