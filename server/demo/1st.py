import numpy as np
from PIL import Image
import pytesseract
import re
import json
import cv2

image = Image.open(r"/Users/kevinlakao/Desktop/MDGSS/server/images/1.png")
image_array = np.array(image)
resized_img = cv2.resize(image_array, (1920, 1080))  # 調整為寬度為1920，高度為1080

crop_dimensions = [
    # 整份報表
    (720, 650, 700, 390),
    # 三大橫排
    # (720, 100, 700, 390),
    # (720, 100, 700, 605),
    # (720, 150, 700, 810),
    # 第一橫排個表格
    # (65, 35, 816, 437),
    # (60, 35, 927, 437),
    # (60, 35, 1034, 437),
    # (60, 35, 1110, 437),
    # (60, 35, 1248, 438),
    # 第二橫排個表格
    # (62, 35, 818, 650),
    # (62, 35, 926, 650),
    # (62, 35, 1033, 650),
    # (62, 35, 1145, 650),
    # (62, 35, 1246, 650),
    # 第三橫排各表格
    # (65, 35, 817, 836),
    # (65, 35, 921, 836),
    # (65, 35, 1029, 837),
    # (65, 35, 1105, 837),
    # (65, 35, 1211, 837),
]
new_dpi = (200, 200)
for i, (w, h, x, y) in enumerate(crop_dimensions, start=1):
    img = resized_img[y : y + h, x : x + w]
    cv2.rectangle(resized_img, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # img = cv2.resize(crop_img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    img = cv2.resize(
        img,
        (
            int(img.shape[1] * new_dpi[0] / img.shape[0]),
            int(img.shape[0] * new_dpi[1] / img.shape[1]),
        ),
    )
    # cv2.imshow("img", img)
    # cv2.waitKey(0)

    code = pytesseract.image_to_string(img)
    nonspe_code = code.strip()
    str_code = re.split("[\n:]+", nonspe_code)

    json_string = json.dumps(str_code, ensure_ascii=False)

    # print(json_string)
    # print(code)
    # cv2.imshow('input_img', img)
    # cv2.waitKey(0)

cv2.imshow("input", resized_img)
cv2.waitKey(0)
