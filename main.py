from ImageSVD import ImageSVD, ColorSVD


class Main:
    def main():
        image = ImageSVD("beav.png")
        image.get_reduced_image(630).save("beav2.png")
        image.get_reduced_image(620).save("beav3.png")
        image.get_reduced_image(600).save("beav4.png")

    if __name__ == "__main__":
        main()

