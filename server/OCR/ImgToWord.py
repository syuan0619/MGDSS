import numpy as np
from PIL import Image
import pytesseract
import cv2
import re
import json


def recognize(uploadImage):
    image = Image.open(uploadImage)
    scaled_images = scale(image)
    resized_image = resize(scaled_images)
    results = perform_ocr(resized_image)
    return results


crop_main = [ 
# (720, 700, 700, 300),
(720, 105, 700, 395),
# (720, 200, 700, 610),
# (720, 150, 700, 810),
]  

crop_dimensions_2 = [
    (70, 50, 150, 230),
    (70, 50, 150, 230),
]
new_dpi = (400, 400)
new_dpi_2 = (30, 300)


def scale(image):
    for i, (w, h, x, y) in enumerate(crop_main, start=1):
        crop_image = image.crop((x, y, x + w, y + h))
        image_array = np.array(crop_image)
        # cv2.imshow("image_2", image_array)
        # cv2.waitKey(0)

    return image_array


def resize(image):
    resized_image = cv2.resize(image, None, fx=1, fy=3, interpolation=cv2.INTER_CUBIC)
    resized_image = cv2.resize(resized_image, (int(resized_image.shape[1] * new_dpi[0] / resized_image.shape[0]), int(resized_image.shape[0] * new_dpi[1] / resized_image.shape[1])))
    return resized_image


def perform_ocr(image):
    code = pytesseract.image_to_string(image)
    data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)

    # cv2.imshow("image_2", image)
    # cv2.waitKey(0)

    result = []
    target_words = ["Right Nasalis", "Left Nasalis", "Right Trapezius", "Left Trapezius", "Right Adb", "Left Adb"]

    for phrase in target_words:
        match = re.search(r'\b' + re.escape(phrase) + r'\b', code, re.IGNORECASE)
        if match:
            start_idx = match.start()
            end_idx = match.end()
            x, y = data['left'][start_idx], data['top'][start_idx]
            for j, (a, b, c, d) in enumerate(crop_dimensions_2, start=1):

                crop_image_2 = image[y + a:y - b, x + c:x + d ]
                # image_2 = cv2.resize(crop_image_2, None, fx=1, fy=1, interpolation=cv2.INTER_CUBIC)
                # image_2 = cv2.resize(image_2, (int(image.shape[1] * new_dpi_2[0] / image.shape[0]), int(image.shape[0] * new_dpi_2[1] / image.shape[1])))  
                image_2 = cv2.resize(crop_image_2, None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC)
                # cv2.imshow("image_2", image_2)
                # cv2.waitKey(0)

                code_2 = pytesseract.image_to_string(image_2)
                nonspe_code = code_2.strip()
                str_code_2 = re.split('[\n:]+', nonspe_code)
                json_string_2 = json.dumps([str_code_2], ensure_ascii=False)  

                result = {
                    "target_phrase": phrase,
                    "result_data": json_string_2,
                    # "text": code[start_idx:end_idx]  # Include the matched text here
                }
    return result


# # Test the OCR recognition
# image_path = r'C:\Users\User\Desktop\MDDGSS\server\images\1.png'  # Update with the path to your test image
# results = recognize(image_path)

# # Print the OCR results
# for result in results:
#     print(result)
