import json
import numpy as np
from PIL import Image
import pytesseract
import cv2
import re


def recognize(uploadImage):
    origin_image = Image.open(uploadImage)
    croped_image = crop(origin_image)
    results_data = perform_ocr(croped_image)
        
    return  results_data


def crop(image):
    image_array = np.array(image)

    # Resize the image
    resized_image = cv2.resize(image_array, (1920, 1080))

    crop_dimensions_main = [(600, 620, 750, 400)]
    for i, (w, h, x, y) in enumerate(crop_dimensions_main, start=1):
        # Crop the image
        crop_image = resized_image[y:y + h, x:x + w]
    resized_image = cv2.resize(
        crop_image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

    return resized_image


crop_dimensions_data = [(125, 55, 352, 80), (125, 55, 350, 503),
                        (125, 55, 145, 503), (125, 55, 135, 875), (
                        125, 55, 350, 875), (122, 55, 563, 875)]


def perform_ocr(resized_image):
    results = []

    code = pytesseract.image_to_string(resized_image)
    data = pytesseract.image_to_data(resized_image, output_type=pytesseract.Output.DICT)
    target_words = ["Right Nasalis", "Left Nasalis", "Right Trapezius", "Left Trapezius", "Right Adb", "Left Adb"]

    for phrase in target_words:
        match = re.search(r'\b' + re.escape(phrase) + r'\b', code, re.IGNORECASE)
        if match:
            start_idx = match.start()
            end_idx = match.end()
            x, y = data['left'][start_idx], data['top'][start_idx]

            for i, (w, h, x, y) in enumerate(crop_dimensions_data, start=1):

                result_image = resized_image[y:y + h, x:x + w]

                # cv2.rectangle(result_image, (x, y), (x + w, y + h), (0, 255, 0), 2)

                result_image_cropped = cv2.resize(result_image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
                # cv2.imshow("result_image", result_image_cropped)
                # cv2.waitKey(0)

                extracted_text = pytesseract.image_to_string(result_image_cropped)
                extracted_text = extracted_text.strip()
                split_text = re.split('[\n:]+', extracted_text)
                json_string = json.dumps(split_text, ensure_ascii=False)

                print(json_string)
                results.append({
                    "target_words": target_words,
                    "result_data": json_string
                })

    return results

# Update with the path to your test image
# image_path = r'C:\Users\User\Desktop\MDDGSS\server\images\1.png'

# crop_image = crop(image_path)
# results = perform_ocr(crop_image)
# for result in results:
#     print(result)
# cv2.imshow("Cropped result_image", crop_image)
# cv2.waitKey(0)
