import numpy as np
from PIL import Image
import pytesseract
import cv2
import re
import json


def recognize(image_path):
    image = Image.open(image_path)
    print(image_path)

    # crop_dimensions = [
    #     (720, 105, 700, 395),
    # ]

    target_words = ["Nasalis", "Trapezius", "Adb"]
    new_dpi = (400, 400)

    results = {}

    for target_word in target_words:
        data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)

        for j, word in enumerate(data['text']):
            if word == target_word:
                x, y, w, h = data['left'][j], data['top'][j], data['width'][j], data['height'][j]

                crop_img = image.crop((x, y, x + w, y + h))
                img_array = np.array(crop_img)

                img_resized = cv2.resize(img_array, None, fx=0.9, fy=0.9, interpolation=cv2.INTER_CUBIC)
                img_resized = cv2.resize(img_resized, (int(image.width * new_dpi[0] / image.width), int(image.height * new_dpi[1] / image.height)))

                code = pytesseract.image_to_string(img_resized)
                nonspe_code = code.strip()
                str_code = re.split('[\n:]+', nonspe_code)
                results[target_word] = str_code
                print(results)

    return json.dumps(results, ensure_ascii=False)


print(recognize("C:/Users/User/Desktop/MDDGSS/server/images/2.png"))
