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


def full_image_to_white_part(uploadImage):
    ori_image = cv2.imread(uploadImage)
    cropped_image = ori_image[
        390 : (1000 - 390),
        775 : (1380 - 775),
    ]
    cv2.imshow("img", cropped_image)
    cv2.waitKey(0)


image_path = r"/Users/kevinlakao/Desktop/MDGSS/server/images/1.png"
full_image_to_white_part(image_path)

# cropped_image = ori_image[
#     390 : (1000 - 390),
#     775 : (1380 - 775),
# ]
