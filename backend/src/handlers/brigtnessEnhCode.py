import cv2
import numpy as np

def brightnessEnhProcess():

    # Load the image
    img = cv2.imread('./src/processImages/tumor.jpeg')

    # Define the brightness and contrast values
    brightness = 50
    contrast = 1.5

    # Apply brightness and contrast adjustments
    adjusted = np.int16(img)
    adjusted = adjusted * contrast + brightness
    adjusted = np.clip(adjusted, 0, 255)
    adjusted = np.uint8(adjusted)

    cv2.imwrite('./src/processImages/brightnessEnh.png', adjusted)

    return '/brightnessEnh.png'
    
print (brightnessEnhProcess())