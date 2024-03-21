import json
import numpy as np
from PIL import Image
import pytesseract
import cv2
import re


def recognize(uploadImage):
    origin_image = Image.open(uploadImage)
    croped_image = crop(origin_image)
    # cv2.imshow("Cropped result_image", croped_image)
    # cv2.waitKey(0)
    results_data = perform_ocr(croped_image)
        
    return  results_data


def getWhite(uploadImage):
    origin_image = Image.open(uploadImage)
    croped_image = crop(origin_image)
    return Image.fromarray(croped_image)


def crop(image):
    image_array = np.array(image)

    # Resize the image
    resized_image = cv2.resize(image_array, (1920, 1080))

    # crop_dimensions_main = [(600, 620, 750, 400)]
    # for i, (w, h, x, y) in enumerate(crop_dimensions_main, start=1):
        # Crop the image
        # crop_image = resized_image[y:y + h, x:x + w]
        
    crop_image = resized_image[400:1020, 750:1350]

    resized_image = cv2.resize(
        crop_image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

    return resized_image


crop_dimensions_data_1 = [(125, 55, 352, 80)]
crop_dimensions_data_2 = [(125, 55, 350, 503),
                        (125, 55, 990, 503), (125, 55, 135, 875),
                        (125, 55, 350, 875), (122, 55, 563, 875)]


def perform_ocr(resized_image):
    results = []
    dif = 0
    code = pytesseract.image_to_string(resized_image)
    data = pytesseract.image_to_data(resized_image, output_type=pytesseract.Output.DICT)
    target_words = ["Right Nasalis", "Left Nasalis", "Right Trapezius", "Left Trapezius", "Right Abd", "Left Abd"]

    target_y_coords = []

    for target_words_idx, target_word in enumerate(target_words):
        match = re.search(r'\b' + re.escape(target_word) + r'\b', code, re.IGNORECASE)
        if match:
            start_idx = match.start()
            end_idx = match.end()
            x, y = data['left'][start_idx], data['top'][start_idx]
            target_y_coords.append(y)
            if len(target_y_coords) >= 2:
                dif = (target_y_coords[1] - target_y_coords[0])

            crop_dimensions = crop_dimensions_data_2 if dif > 50 else crop_dimensions_data_1
            for i, (w, h, x, y) in enumerate(crop_dimensions, start=1):
                result_image = resized_image[y:y + h, x:x + w]
                result_image_cropped = cv2.resize(result_image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
                result_image_gray = cv2.cvtColor(result_image_cropped, cv2.COLOR_BGR2GRAY)
                extracted_text = pytesseract.image_to_string(result_image_gray)
                extracted_text = extracted_text.strip().encode('ascii', 'ignore').decode('ascii')
                split_text = re.split('[\n:]+', extracted_text)

                for result in results:
                    if result["target_words"] == target_word:
                        result["result_data"].extend(split_text)
                        break
                else:
                    results.append({
                        "target_words": target_word,
                        "result_data": split_text
                    })
                    
    return results


# # Update with the path to your test image
# image_path = r'C:\Users\User\Desktop\MDDGSS\server\images\9.png'  # Update with the path to your test image
# results = recognize(image_path)

# Print the OCR results
# for result in results:
#     print(result)
# cv2.imshow("Cropped result_image", crop_image)
# cv2.waitKey(0)
