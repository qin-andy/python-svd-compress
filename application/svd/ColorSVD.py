import numpy as np
import time

MAX_SVS = 150

class ColorSVD:
    def __init__(self, matrix):
        # self.u, self.s, self.vh = np.linalg.svd(matrix)
        start = time.time()
        pre_u, pre_s, pre_vh = np.linalg.svd(matrix)
        self.s = pre_s[:MAX_SVS]
        self.u = pre_u[:, :MAX_SVS]
        self.vh = pre_vh[:MAX_SVS, :]
        print("SVD initialized: " + str(time.time() - start))

    def reduce(self, singular_values):
        start = time.time()
        s = np.diag(self.s[:singular_values])
        u = self.u[:, :singular_values]
        vh = self.vh[:singular_values, :]

        result = np.matmul(u, s)
        result = np.matmul(result, vh)
        result = np.clip(result, 0, 255)
        print("SVD reduced: " + str(time.time() - start))
        return result
