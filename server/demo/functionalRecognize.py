import numpy as np
from PIL import Image
import pytesseract
import cv2

kernel_one = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
kernel_two = np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
crop_dimensions_data_one_row = [
    [(123, 65, 350, 75)],
    [
        (125, 65, 350, 502),
        (125, 65, 990, 502),
        (125, 65, 135, 872),
        (125, 65, 348, 872),
        (125, 65, 563, 872),
    ],
]
crop_dimensions_data_two_row = [
    [
        (125, 65, 355, 75),
        (125, 65, 990, 75),
        (125, 65, 135, 445),
        (125, 65, 355, 445),
        (122, 65, 563, 445),
    ],
    [
        (125, 65, 350, 875),
    ],
]
target_words_left_right_muscle = [
    "Right Nasalis",
    "Left Nasalis",
    "Right Trapezius",
    "Left Trapezius",
    "Right Abd",
    "Left Abd",
]
target_words_muscle_name = ["Nasalis", "Trapezius", "Abd"]


def functionalRecognize(uploadImage):
    white_part, weight = full_image_to_white_part(uploadImage)
    recognized_muscle_index = get_tested_muscle_index(image_processing(white_part))
    if len(recognized_muscle_index[0]) < 2:
        print("只有一個受測肌肉或根本辨識不出來")
        return "error"
    recognized_muscle, recognized_index = (
        recognized_muscle_index[0],
        recognized_muscle_index[1],
    )
    crop_dimensions_data = determine_recognize_area(recognized_index, weight)
    result_of_recognizition = recognize_result(
        recognized_muscle, crop_dimensions_data, white_part, weight
    )
    return (
        result_of_recognizition,
        Image.fromarray(white_part),
    )  # 老吳如果要白色部分把white_part放進return裡就好


# 規定的標準尺寸下 720p/1080p/2k 都是 1.77777778 的比例因此可以將絕對座標加權
# 讓辨識成果可以適應三種常見尺寸（或符合這個螢幕比例的尺寸），但暫時不支援 4k（比例不同）
# 之後要改成可以適用更多尺寸就調整權重，現在只有 1920*1080
def full_image_to_white_part(uploadImage):
    origin_image = Image.open(uploadImage)
    image_array = np.array(origin_image)
    screen_size_height, screen_size_width, screen_size_color = image_array.shape
    weight = round(screen_size_width / 1920, 4)
    cropped_image = cv2.resize(
        image_array[
            int(400 * weight) : int(1020 * weight),
            int(750 * weight) : int(1350 * weight),
        ],
        None,
        None,
        fx=2,
        fy=2,
        interpolation=cv2.INTER_NEAREST,
    )
    # cv2.imshow("img", cropped_image)
    # cv2.waitKey(0)

    return cropped_image, weight


# 先影像處理完，辨識一次，得到兩個受測肌肉座標
def get_tested_muscle_index(white_part):
    recognized_muscle = []
    recognized_muscle_index = []
    data = pytesseract.image_to_data(white_part, output_type=pytesseract.Output.DICT)
    # print("\n", data)
    for idx, (left, top, width, height, text, conf) in enumerate(
        zip(
            data["left"],
            data["top"],
            data["width"],
            data["height"],
            data["text"],
            data["conf"],
        )
    ):
        if int(data["conf"][idx]) > 70 and text in target_words_muscle_name:
            recognized_muscle.append(data["text"][idx - 1] + " " + text)
            recognized_muscle_index.append(top)
            ######################## 快速找座標 #########################
        # if text == "3.2%":
        #     print("text=" + text,
        #         "left: ",
        #         left,
        #         ",top: ",
        #         top,
        #         ",width:  ",
        #         width,
        #         ",height: ",
        #         height,
        #         ",text: ",
        #         text,
        #         ",,,conf: ",
        #         conf,
        #     )
    return recognized_muscle, recognized_muscle_index


# 藉由兩個受測肌肉座標判斷第一個受測肌肉分別有幾個橫排，來決定要辨識的重點範圍
def determine_recognize_area(recognized_index, weight):
    if int(recognized_index[1]) - int(recognized_index[0]) > int(600 * weight):
        return crop_dimensions_data_two_row
    return crop_dimensions_data_one_row


# 辨識圖片並輸出
def recognize_result(recognized_muscle, crop_dimensions_data, white_part, weight):
    results = []
    recognized_string_splited_by_line = []
    for muscle, crop_dimensions_data in zip(recognized_muscle, crop_dimensions_data):
        for crop_dimensions_data in crop_dimensions_data:
            width, height, x, y = crop_dimensions_data
            resize_image = white_part[
                y : y + int(height * weight), x : x + int(width * weight)
            ]
            enlarge_resize_image = cv2.resize(
                resize_image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC
            )
            ########### 可以打開這個看每一張小圖經過圖像處理後的差別 ###########
            # cv2.imshow("img", enlarge_resize_image)
            # cv2.waitKey(0)
            # cv2.imshow("img", image_processing(enlarge_resize_image))
            # cv2.waitKey(0)
            recognized_string = (
                pytesseract.image_to_string(enlarge_resize_image)
                .encode("ascii", "ignore")
                .decode("ascii")
                .splitlines()
            )
            recognized_string_splited_by_line.extend(recognized_string)
        results.append(
            {
                "target_words": muscle,
                "result_data": recognized_string_splited_by_line.copy(),
            }
        )
        recognized_string_splited_by_line.clear()
    return results


# 每張圖片通用的影像處理函式，分別是灰階，降噪，銳化
def image_processing(image):
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur_image = cv2.GaussianBlur(gray_image, (5, 5), 0)
    sharpened_image = cv2.filter2D(blur_image, -1, kernel_two)
    return sharpened_image


# Update with the path to your test image
image_path = r"/Users/kevinlakao/Desktop/MDGSS/server/images/1.png"
functionalRecognize(image_path)

# 單純列出所有字
# word = pytesseract.image_to_string(white_part)
# print(word)

# 每個字都匡
# boxes = pytesseract.image_to_boxes(white_part, output_type=pytesseract.Output.DICT)
# for left, bottom, right, top in zip(boxes["left"], boxes["bottom"], boxes["right"], boxes["top"]):
#     img = cv2.rectangle(white_part, (left, screen_size_height - bottom), (right, screen_size_height - top), (0, 255, 0), 2)
# cv2.imshow("img", img)
# cv2.waitKey(0)

# 匡詞而已不匡字
# data = pytesseract.image_to_data(white_part,output_type=pytesseract.Output.DICT)
# print(data)
# for i, (left, top, width, height)  in enumerate(zip(data["left"], data["top"], data["width"], data["height"])):
#     if int(data["conf"][i]) > 70:
#         (x, y, w, h) = (left, top, width, height)
#         img = cv2.rectangle(white_part, (x, y), (x + w, y + h), (0, 255, 0), 2)
# cv2.imshow("img", img)
# cv2.waitKey(0)

# 用字串查詢，無法得知真實index
# for target_word in target_words:
#     match = re.search(r'\b' + re.escape(target_word) + r'\b', word, re.IGNORECASE)
#     if match:
#         print(match)
#         start_idx = match.start()
#         print(start_idx)
#         x, y = data['left'][start_idx], data['top'][start_idx]
#         cv2.rectangle(white_part, (x, y), (x + 10, y + 10), (0, 255, 0), 2)
#         recognized_muscle_index.append([x, y])
#         recognized_muscle.append(target_word)
# cv2.imshow("img", white_part)
# cv2.waitKey(0)
