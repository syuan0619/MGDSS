import numpy as np
from PIL import Image
import pytesseract
import cv2
import re
import json


def recognize(uploadImage):
    image = Image.open(uploadImage)
    scaled_images = scale(image)
    resized_images = [resize(img) for img in scaled_images]
    results = perform_ocr(resized_images)
    return results


crop_main = [ 
    (720, 105, 700, 395),
]

crop_dimensions_2 = [
    (70, 50, 150, 230),
    (70, 50, 150, 230),
]

new_dpi = (400, 400)
new_dpi_2 = (30, 300)


def scale(image):
    scaled_images = []
    for i, (w, h, x, y) in enumerate(crop_main, start=1):
        crop_image = image.crop((x, y, x + w, y + h))
        image_array = np.array(crop_image)
        scaled_images.append(image_array)
    return scaled_images


def resize(image):
    resized_image = cv2.resize(image, None, fx=1, fy=3, interpolation=cv2.INTER_CUBIC)
    resized_image = cv2.resize(resized_image, (int(resized_image.shape[1] * new_dpi[0] / resized_image.shape[0]), int(resized_image.shape[0] * new_dpi[1] / resized_image.shape[1])))
    return resized_image


def perform_ocr(resized_images):
    result = []

    for i, resized_image in enumerate(resized_images, start=1):
        code = pytesseract.image_to_string(resized_image)
        data = pytesseract.image_to_data(resized_image, output_type=pytesseract.Output.DICT)

        target_words = ["Right Nasalis", "Left Nasalis", "Right Trapezius", "Left Trapezius", "Right Adb", "Left Adb"]

        for phrase in target_words:
            match = re.search(r'\b' + re.escape(phrase) + r'\b', code, re.IGNORECASE)
            if match:
                start_idx = match.start()
                end_idx = match.end()
                x, y = data['left'][start_idx], data['top'][start_idx]
                for j, (a, b, c, d) in enumerate(crop_dimensions_2, start=1):
                    crop_image_2 = resized_image[y + a:y - b, x + c:x + d]
                    image_2 = cv2.resize(crop_image_2, None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC)
                    code_2 = pytesseract.image_to_string(image_2)
                    nonspe_code = code_2.strip()
                    if nonspe_code:  # Check if the extracted text is not empty
                        str_code_2 = re.split('[\n:]+', nonspe_code)
                        json_string_2 = json.dumps(str_code_2, ensure_ascii=False)
                        result.append({
                            "target_phrase": phrase,
                            "result_data": [json_string_2 ,json_string_2 ,json_string_2]
                            # "text": code[start_idx:end_idx]  # Include the matched text here
                        })

    return result


# # Test the OCR recognition
# image_path = r'C:\Users\User\Desktop\MDDGSS\server\images\1.png'  # Update with the path to your test image
# results = recognize(image_path)

# # Print the OCR results
# for result in results:
#     print(result)
