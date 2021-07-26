export async function sendImage(img, value) {
  let formData = new FormData();

  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  formData.append("data64", canvas.toDataURL());
  formData.append("width", canvas.width);
  formData.append("height", canvas.height);
  let query = "?svs=" + value;

  // Make request
  let newImg = await toAPI('/upload/image' + query, { method: "POST", body: formData });
  return newImg
}

export async function recalculateImg(svs) {
  return await toAPI("/recalculate?svs=" + svs);
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