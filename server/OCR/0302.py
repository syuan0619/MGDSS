import numpy as np
from PIL import Image
import cv2
import pytesseract
import re

image = Image.open(r'C:\Users\曾澤軒\Desktop\專題\printScreen\1.png')
image_array = np.array(image)
resized_image = cv2.resize(image_array, (1920, 1080))  # 調整為寬度為1920，高度為1080
# cv2.imshow("Cropped Image", resized_image)
# cv2.waitKey(0)
# new_dpi = (1980, 1080) 

crop_dimensions = [
    (650, 650, 750, 400),
]
target_words = ["Right Nasalis", "Left Nasalis",
                "Right Trapezius", "Left Trapezius", "Right Adb", "Left Adb"]

# 處理每個裁剪區域
for i, (w, h, x, y) in enumerate(crop_dimensions, start=1):
    # 裁剪圖像
    crop_image = resized_image[y:y + h, x:x + w] 

    # 放大圖像
    image_array = np.array(crop_image)
    image_2 = cv2.resize(image_array, None,
                         fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    # 使用pytesseract進行文字辨識
    code = pytesseract.image_to_string(image_2)

    # 尋找目標字詞的位置
    data = pytesseract.image_to_data(
        image_2, output_type=pytesseract.Output.DICT)
    for phrase in target_words:
        for j, txt in enumerate(data['text']):
            match = re.search(r'\b' + re.escape(phrase) +
                              r'\b', code, re.IGNORECASE)
            if match:
                x_pos = data['left'][j]
                y_pos = data['top'][j]
                width = data['width'][j]
                height = data['height'][j]
                
                # 標記目標文字的位置
                # cv2.rectangle(image_2, (x_pos, y_pos), (x_pos + width, y_pos + height), (0, 255, 0), 2)
                print(f"Target word '{phrase}' found at position (x={x_pos}, y={y_pos})")

# 顯示放大後的圖像，只顯示放大後的圖像，不顯示原始圖像
cv2.imshow("Cropped Image", image_2)
print(code)
# 等待按鍵輸入
cv2.waitKey(0)

# 關閉所有OpenCV視窗
cv2.destroyAllWindows()
