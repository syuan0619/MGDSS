import numpy as np
from PIL import Image
import cv2
import pytesseract
import re
import json


def scale(image):
    crop_dimensions = (700, 390, 1380, 900)  # Adjusted cropping dimensions (left, upper, right, lower)
    crop_image = image.crop(crop_dimensions)
    image_array = np.array(crop_image)
    scaled_image = cv2.resize(image_array, None,
                        fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

    cv2.imshow("image_2", scaled_image)
    cv2.waitKey(0)
    return scaled_image


def find_target_words(image):
    target_words = ["Right Nasalis", "Left Nasalis", "Right Trapezius", "Left Trapezius", "Right Adb", "Left Adb"]
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
            # Don't break here to capture all occurrences of the target word
    return targets


def perform_ocr(resized_image, targets):
    results = []
    crop_dimensions_2 = [(352, 80, 28, 53)]  # Define your crop dimensions here

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
                crop_image_2 = resized_image[y + a:y + b, x + c:x + d]
                image_2 = cv2.resize(crop_image_2, None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC)
                code_2 = pytesseract.image_to_string(image_2)
                nonspe_code = code_2.strip()
                if nonspe_code:  # Check if the extracted text is not empty
                    str_code_2 = re.split('[\n:]+', nonspe_code)
                    json_string_2 = json.dumps(str_code_2, ensure_ascii=False)
                    results.append({
                        "target_phrase": phrase,
                        "result_data": json_string_2,
                        # "text": code[start_idx:end_idx]  # Include the matched text here
                    })
    return results


def recognize(image_path):
    try:
        image = Image.open(image_path)
        scaled_image = scale(image)
        targets = find_target_words(scaled_image)
        results = perform_ocr(scaled_image, targets)
        return results
    except Exception as e:
        print("Error:", e)
        return []


# Test the OCR recognition
image_path = r'C:\Users\User\Desktop\MDDGSS\server\images\1.png'  # Update with the path to your test image
results = recognize(image_path)

# Print the OCR results
for result in results:
    print(result)
