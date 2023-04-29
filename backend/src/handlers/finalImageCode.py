import cv2
import numpy as np

def tumordDetectionProcess():

    # Read the image and convert it to grayscale
    image = cv2.imread('./src/processImages/sharpnessEnh.png')

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply thresholding to create a binary image
    ret, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY)

    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(image, contours, -1, (0, 255, 0), 2)

    # Calculate the total contour area
    total_area = 0
    for contour in contours:
        area = cv2.contourArea(contour)
        total_area += area

    # print('Total contour area:', total_area)
        
    # Display the final image
    cv2.imwrite('./src/processImages/tumorDetected.png', image)

    return 'tumorDetected.png'
    
print (tumordDetectionProcess())