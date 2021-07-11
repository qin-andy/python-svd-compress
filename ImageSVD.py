import numpy as np
from PIL import Image


class ImageSVD:
    def __init__(self, image_path):
        im = np.array(Image.open(image_path))
        print(im.shape)
        r1 = im[:, :, 0]
        g1 = im[:, :, 1]
        b1 = im[:, :, 2]
        self.r = ColorSVD(r1)
        self.g = ColorSVD(g1)
        self.b = ColorSVD(b1)

    def get_reduced_image(self, svs):
        rgb2 = np.stack((self.r.reduce(svs), self.g.reduce(svs), self.b.reduce(svs)), 2)
        rgb2 = rgb2.astype(np.uint8)
        return rgb2


class ColorSVD:
    def __init__(self, matrix):
        self.u, self.s, self.vh = np.linalg.svd(matrix)

    def reduce(self, singular_values):
        s = np.diag(self.s[:singular_values])
        u = self.u[:, :singular_values]
        vh = self.vh[:singular_values, :]
        result = np.matmul(u, s)
        result = np.matmul(result, vh)
        return np.clip(result, 0, 255)
