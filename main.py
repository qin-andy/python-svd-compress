from ImageSVD import ImageSVD, ColorSVD
from PIL import Image


class Main:
    def main():
        image = ImageSVD("tapir_sad.jpg")
        Image.fromarray(image.get_reduced_image(3)).save("beav2.png")
        Image.fromarray(image.get_reduced_image(128)).save("beav3.png")
        Image.fromarray(image.get_reduced_image(126)).save("beav4.png")

    if __name__ == "__main__":
        main()

