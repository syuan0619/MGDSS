import json
import re
import numpy as np
from PIL import Image
import pytesseract
import cv2 

crop_dimensions_data_1 = [(125, 55, 352, 80)]
crop_dimensions_data_2 = [(125, 55, 350, 503),
                        (125, 55, 990, 503), (125, 55, 135, 875),
                        (125, 55, 350, 875), (122, 55, 563, 875)]
kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
target_words = ["Right Nasalis", "Left Nasalis", "Right Trapezius", "Left Trapezius", "Right Abd", "Left Abd"]


def functionalRecognize(uploadImage):
    white_part = full_image_to_white_part(uploadImage)
    muscle_index = get_tested_muscle_index(image_processing(white_part))
    ready_to_recognize_image = get_tested_muscle_area_by_muscle_index(muscle_index)
    result_of_recognizition = recognize_result(ready_to_recognize_image)
    print(result_of_recognizition)
    return "兩個辨識完的物件跟一張白色範圍的照片"


# 規定的標準尺寸下 720p/1080p/2k 都是 1.77777778 的比例因此可以將絕對座標加權
# 讓辨識成果可以適應三種常見尺寸（或符合這個螢幕比例的尺寸），但暫時不支援 4k（比例不同）
def full_image_to_white_part(uploadImage):
    origin_image = Image.open(uploadImage)
    image_array = np.array(origin_image)
    screen_size_height, screen_size_width, screen_size_color = image_array.shape
    weight = round(screen_size_width / 1920, 3)
    print(weight)
    cropped_image = cv2.resize(image_array[int(400 * weight):int(1020 * weight), int(750 * weight):int(1350 * weight)]
                              , None, None, fx=2, fy=2, interpolation=cv2.INTER_NEAREST)
    return cropped_image


# 先影像處理完，辨識一次，得到兩個受測肌肉座標
def get_tested_muscle_index(white_part):
    recognized_muscle = []
    recognized_muscle_index = []
    word = pytesseract.image_to_string(white_part)
    index = pytesseract.image_to_data(white_part, output_type=pytesseract.Output.DICT)
    for target_word in target_words:
        match = re.search(r'\b' + re.escape(target_word) + r'\b', word, re.IGNORECASE)
        if match:
            start_idx = match.start()
            x, y = index['left'][start_idx], index['top'][start_idx]
            cv2.rectangle(white_part, (x, y), (x + 10, y + 10), (0, 255, 0), 2)

            recognized_muscle_index.append([x, y])
            recognized_muscle.append(target_word)
    print(recognized_muscle, recognized_muscle_index)
    cv2.imshow("Cropped result_image", white_part)
    cv2.waitKey(0)

    return "兩個受測肌肉座標"


# 藉由兩個受測肌肉座標相減，判斷誰要切兩排誰要切一排
def get_tested_muscle_area_by_muscle_index(muscle_index):
    return "一張只有pre activation的圖跟另一張有post activation的圖"


# 辨識完圖片，並且搞成前端要的資料型態、格式
def recognize_result(ready_to_recognize_image):
    return ""


# 每張圖片通用的影像處理函式
def image_processing(image):
    binary_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur_image = cv2.GaussianBlur(binary_image, (5, 5), 0)
    sharpened_image = cv2.filter2D(blur_image, -1, kernel)
    return sharpened_image

    # cv2.waitKey(0)
    # cv2.imshow("Cropped result_image", blur_image)


image_path = r'C:\Users\User\Desktop\MDDGSS\server\images\1.png'  # Update with the path to your test image
functionalRecognize(image_path)
