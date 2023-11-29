import numpy as np
import pytesseract
import cv2
import re

def img_to_code(fileLocation:str):
    image = cv2.imread(r'' + fileLocation)

    gray_img=cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)#轉成灰色
    sim_img=cv2.threshold(gray_img, 200, 240, cv2.THRESH_BINARY)[1]#二值化不反轉 155,250效果好一點
    code = pytesseract.image_to_string(sim_img, lang="chi_tra")

    nonspe_code=code.strip()
    str_code=re.split('[\n:]+', nonspe_code)

    id_num=str_code[str_code.index("ID#")+1].strip()
    return id_num

# print(str_code)
# cv2.imshow("test", sim_img)
# cv2.waitKey(0)
        