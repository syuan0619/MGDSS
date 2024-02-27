import numpy as np
from PIL import Image
import pytesseract
import cv2
import re
import json

def recognize(image):
    scale(image)
    resize(image)
    



def scale(image_path):
    image = Image.open(image_path)
    crop_main = (720, 700, 700, 300)
    for i, (w, h, x, y) in enumerate(crop_main, start=1):
        crop_img = image.crop((x, y, x + w, y + h))
        image_array = np.array(crop_img)

    return image_array


def resize(image):
    new_dpi = (400, 400)
    resize_image = cv2.resize(image, None, fx=1, fy=3, interpolation=cv2.INTER_CUBIC)
    resize_image = cv2.resize(resize_image, (int(resize_image.shape[1] * new_dpi[0] / resize_image.shape[0]), int(resize_image.shape[0] * new_dpi[1] / resize_image.shape[1])))
   
