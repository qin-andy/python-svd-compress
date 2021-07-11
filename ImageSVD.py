import numpy as np
from PIL import Image


class ImageSVD:
    def __init__(self, image_path):
        im = np.array(Image.open(image_path))
        im2 = np.moveaxis(im, 2, 0)
        r1 = im[:, :, 0]
        g1 = im[:, :, 1]
        b1 = im[:, :, 2]
        self.r = ColorSVD(r1)
        self.g = ColorSVD(g1)
        self.b = ColorSVD(b1)

    def get_reduced_image(self, reduction):
        rgb2 = np.stack((self.r.reduce(reduction), self.g.reduce(reduction), self.b.reduce(reduction)), 2)
        rgb2 = rgb2.astype(np.uint8)
        return Image.fromarray(rgb2)


class ColorSVD:
    def __init__(self, matrix):
        self.u, self.s, self.vh = np.linalg.svd(matrix)

    def reduce(self, reduction):
        s = np.diag(self.s[:-reduction])
        result = np.matmul(self.u[:, :-reduction], s)
        result = np.matmul(result, self.vh[:-reduction, :])
        return result
