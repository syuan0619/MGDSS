import numpy as np
from PIL import Image
import cv2
import pytesseract
import re

image = Image.open(r'C:\Users\User\Desktop\MDDGSS\server\images\1.png')
image_array = np.array(image)
resized_image = cv2.resize(image_array, (1920, 1080))  # Resize to width 1920 and height 1080

# Define the cropping area
crop_dimensions_main = [
    (650, 650, 750, 400),
]

# Target words to find
target_words = ["Right Nasalis", "Left Nasalis",
                "Right Trapezius", "Left Trapezius", "Right Adb", "Left Adb"]

# Process each cropping area
for i, (w, h, x, y) in enumerate(crop_dimensions_main, start=1):
    # Crop the image
    crop_image = resized_image[y:y + h, x:x + w] 

    # Enlarge the image
    image_array = np.array(crop_image)
    image_2 = cv2.resize(image_array, None,
                         fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    
    # Use pytesseract for text recognition
    code = pytesseract.image_to_string(image_2)

    # Find the positions of target words
    for phrase in target_words:
        matches = re.finditer(r'\b' + re.escape(phrase) + r'\b', code, re.IGNORECASE)
        for match in matches:
            match_start = match.start()
            match_end = match.end()
            # Calculate the coordinates relative to the original image
            match_x = x + match_start
            match_y = y
            print(f"Target word '{phrase}' found in area {i} at position (x={match_x}, y={match_y})")

# Print the extracted text
# print(code)
