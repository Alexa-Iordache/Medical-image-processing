import cv2
import numpy as np

def brightnessEnhProcess():

    # Open the image
    img = cv2.imread('./src/processImages/rice.jpeg')

    # Define a scalar value to increase the brightness
    brightness = 50

    # Add the brightness to the image
    brightened = cv2.add(img, brightness)

    # Display the original and brightened images
    cv2.imwrite('./src/processImages/brightnessEnh.png', brightened)

    return '/brightnessEnh.png'
    
print (brightnessEnhProcess())