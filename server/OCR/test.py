import numpy as np
from PIL import Image
import cv2
import pytesseract
import re
import json


def recognize(image_path):
    image = Image.open(image_path)
    scaled_images = scale(image)
    targets = find_target_words(scaled_images)
    results = perform_ocr(scaled_images, targets)
    return results


crop_main = [
    (650, 650, 750, 400),
]
crop_dimensions_2 = [(352, 80, 370, 133), ]


def scale(image):
    for i, (w, h, x, y) in enumerate(crop_main, start=1):
        crop_image = image.crop((x, y, x + w, y + h))
        image_array = np.array(crop_image)
    return image_array


target_words = ["Right Nasalis", "Left Nasalis", "Right Trapezius", "Left Trapezius", "Right Adb", "Left Adb"]


def resize(image):
    resized_image = cv2.resize(image, None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC)
    return resized_image


def find_target_words(image):
    targets = []

    code = pytesseract.image_to_string(image)
    data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
    for phrase in target_words:
        matches = re.finditer(r'\b' + re.escape(phrase) + r'\b', code, re.IGNORECASE)
        for match in matches:
            match_start = match.start()
            match_end = match.end()
            x = data['left'][match.start()]
            y = data['top'][match.start()]
            targets.append((phrase, x, y))
            break  # Only consider the first match for each phrase
    return targets


def perform_ocr(image, targets):
    results = []

    for phrase, x, y in targets:
        for j, (a, b, c, d) in enumerate(crop_dimensions_2, start=1):
            target_area = image[y + a:y - b, x + c:x + d ]
            resized_image = resize(target_area)
            code_2 = pytesseract.image_to_string(resized_image)
            nonspe_code = code_2.strip()
            str_code_2 = re.split('[\n:]+', nonspe_code)
            json_string_2 = json.dumps(str_code_2, ensure_ascii=False)  

            test_result = {
                "target_phrase": phrase,
                "result_data": json_string_2,
                # Add more result data if needed
            }
            results.append(test_result)

    return results


# Test the OCR recognition
image_path = r'C:\Users\User\Desktop\MDDGSS\server\images\1.png'  # Update with the path to your test image
results = recognize(image_path)

# Print the OCR results
for result in results:
    print(result)

    
# 以第一個辨識文字為(0,0)
# #第一排文字PRE(352,80)(370,133)
# 第二排受側肌肉[0,424]
# #第二排文字PRE(550,503)(469,558)
# #第二排文字PRE(995,503)(1112,558)
# #第三排文字POST{(137,875)(254,930),(351,875)(469,930),(563,875)(684,931),}
