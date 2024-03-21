import json
import re
import numpy as np
from PIL import Image
import pytesseract
from cv2 import cv2 as cv

crop_dimensions_data_1 = [(125, 55, 352, 80)]
crop_dimensions_data_2 = [(125, 55, 350, 503),
                        (125, 55, 990, 503), (125, 55, 135, 875),
                        (125, 55, 350, 875), (122, 55, 563, 875)]

def functionalRecognize(uploadImage):
    standard_image = standard_image_size(uploadImage)
    white_part =  full_image_to_white_part(standard_image)
    muscle_index = get_tested_muscle_index(white_part)
    ready_to_recognize_image = get_tested_muscle_area_by_muscle_index(muscle_index)
    result_of_recognizition = recognize_result(ready_to_recognize_image)
    print(result_of_recognizition)
    return "兩個辨識完的物件跟一張白色範圍的照片"

#規定的標準尺寸下 720p/1080p/2k 都是 1.77777778 的比例因此可以將絕對座標加權
#讓辨識成果可以適應三種常見尺寸（或符合這個螢幕比例的尺寸），但暫時不支援 4k（比例不同）
def standard_image_size(uploadImage):
    image_array = np.array(uploadImage)
    #這裡需要一個funcion去判斷螢幕比例
    screen_size_weight = 1
    cropped_image = cv.resize(image_array[400*screen_size_weight:1020*screen_size_weight, 750*screen_size_weight:1350*screen_size_weight],None,None,fx=2,fy=2,interpolation=cv.INTER_NEAREST)
    return "標準尺寸"

#因為前面尺寸已經固定成1280*720，因此這邊可以用絕對位置來切圖
def full_image_to_white_part(standard_image):
    
    return "原圖中的白色部分"

#先影像處理完，辨識一次，得到兩個受測肌肉座標
def get_tested_muscle_index(white_part):
    return "兩個受測肌肉座標"

#藉由兩個受測肌肉座標相減，判斷誰要切兩排誰要切一排
def get_tested_muscle_area_by_muscle_index(muscle_index):
    return "一張只有pre activation的圖跟另一張有post activation的圖"

#辨識完圖片，並且搞成前端要的資料型態、格式
def recognize_result(ready_to_recognize_image):
    return ""

#每張圖片統一用的影像處理函式
def image_processing():
    return ""