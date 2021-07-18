import numpy as np
from PIL import Image

from application.svd.ColorSVD import ColorSVD


class ImageSVD:
    def __init__(self, data, width=0, height=0):
        if isinstance(data, list):
            im = np.array(data).astype(np.uint8)
            self.width, self.height = width, height
            r1 = im[0::4].reshape(height, width)
            g1 = im[1::4].reshape(height, width)
            b1 = im[2::4].reshape(height, width)
            self.r = ColorSVD(r1)
            self.g = ColorSVD(g1)
            self.b = ColorSVD(b1)

        elif isinstance(data, str):
            im = np.array(Image.open(data))
            self.height, self.width = im.shape[0], im.shape[1]
            r1, g1, b1 = im[:, :, 0], im[:, :, 1], im[:, :, 2]
            self.r = ColorSVD(r1)
            self.g = ColorSVD(g1)
            self.b = ColorSVD(b1)

    def get_reduced_image(self, svs):
        rgb2 = np.stack((self.r.reduce(svs), self.g.reduce(svs), self.b.reduce(svs)), 2)
        rgb2 = rgb2.astype(np.uint8)
        return rgb2