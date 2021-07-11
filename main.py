import numpy as np
from PIL import Image

reduce_val = 630
image_path = "beav.png"

im = np.array(Image.open(image_path))
im2 = np.moveaxis(im, 2, 0)
r = im[:, :, 0]
g = im[:, :, 1]
b = im[:, :, 2]


def reduce(a, reduction):
    u, s, vh = np.linalg.svd(a, reduction)
    s = np.diag(s[:-reduction])
    result = np.matmul(u[:, :-reduction], s)
    result = np.matmul(result, vh[:-reduction, :])
    return result


r2 = reduce(r, reduce_val)
g2 = reduce(g, reduce_val)
b2 = reduce(b, reduce_val)
rgb2 = np.stack((r2, g2, b2), 2)
rgb2 = rgb2.astype(np.uint8)
Image.fromarray(rgb2).save("rgb2.png")
