import numpy as np

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
