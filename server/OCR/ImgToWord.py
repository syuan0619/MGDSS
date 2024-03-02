import numpy as np
from PIL import Image
import pytesseract
import cv2
import re
import json

# 主要辨識函式


def recognize(image_path):
    image = Image.open(image_path)
    scaled_image_array = scale(image)
    resized_image = resize(scaled_image_array)
    results = perform_ocr(resized_image)
    return results


crop_main = [
    # (720, 700, 700, 300),
    (720, 105, 700, 395),
    # (720, 200, 700, 610),
    # (720, 150, 700, 810),
]
#以第一個辨識文字為(0,0)
##第一排文字PRE(352,80)(370,133)
#第二排受側肌肉[0,424]
##第二排文字PRE(550,503)(469,558)
##第二排文字PRE(995,503)(1112,558)
##第三排文字POST{(137,875)(254,930),(351,875)(469,930),(563,875)(684,931),}


crop_dimensions_2 = [
    (70, 50, 150, 230),
    (70, 50, 150, 230),
]
new_dpi = (400, 400)
new_dpi_2 = (30, 300)

# STEP 1:


def scale(image):
    for i, (w, h, x, y) in enumerate(crop_main, start=1):
        crop_image = image.crop((x, y, x + w, y + h))
        scaled_image_array = np.array(crop_image)
        scaled_image_array = cv2.resize(scaled_image_array, (1920, 1080))  # 調整為寬度為1920，高度為1080

    return scaled_image_array


def resize(image):
    resized_image = cv2.resize(
        image, None, fx=1, fy=3, interpolation=cv2.INTER_CUBIC)
    resized_image = cv2.resize(resized_image, (int(resized_image.shape[1] * new_dpi[0] / resized_image.shape[0]), int(
        resized_image.shape[0] * new_dpi[1] / resized_image.shape[1])))
    return resized_image


def perform_ocr(image):
    code = pytesseract.image_to_string(image)
    data = pytesseract.image_to_data(
        image, output_type=pytesseract.Output.DICT)

    cv2.imshow("image_2", image)
    cv2.waitKey(0)

    result = []
    target_words = ["Right Nasalis", "Left Nasalis",
                    "Right Trapezius", "Left Trapezius", "Right Adb", "Left Adb"]

    for phrase in target_words:
        match = re.search(r'\b' + re.escape(phrase) +
                          r'\b', code, re.IGNORECASE)
        if match:
            start_idx = match.start()
            end_idx = match.end()
            x, y = data['left'][start_idx], data['top'][start_idx]
            for j, (a, b, c, d) in enumerate(crop_dimensions_2, start=1):

                crop_image_2 = image[y + a:y - b, x + c:x + d]
                image_2 = cv2.resize(crop_image_2, None,
                                     fx=3, fy=3, interpolation=cv2.INTER_CUBIC)
                cv2.imshow("image_2", image_2)
                cv2.waitKey(0)
                code_2 = pytesseract.image_to_string(image_2)
                nonspe_code = code_2.strip()
                str_code_2 = re.split('[\n:]+', nonspe_code)
                json_string_2 = json.dumps([str_code_2], ensure_ascii=False)
                # print(json_string_2)

                result = {
                    "target_phrase": phrase,
                    "result_data": json_string_2,
                }
    return result


# Test the OCR recognition
# Update with the path to your test image
# image_path = r'C:\Users\曾澤軒\Desktop\Git\MDGSS\server\images\1.png'
# results = recognize(image_path)

# # Print the OCR results
# for result in results:
#     print(result)
