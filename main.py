from ImageSVD import ImageSVD, ColorSVD
from PIL import Image


class Main:
    def main():
        image = ImageSVD("beav.png")
        Image.fromarray(image.get_reduced_image(3)).save("beav2.png")
    if __name__ == "__main__":
        main()

