import cv2
import numpy as np

def contrastEnhProcess():

    # Load the image
    img = cv2.imread('./src/processImages/tumor.jpeg')

    # Convert the image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Apply adaptive histogram equalization
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    equalized = clahe.apply(gray)

    # Apply contrast stretching
    minmax = np.percentile(equalized, (5, 95))
    stretched = np.uint8(np.clip((equalized - minmax[0]) / (minmax[1] - minmax[0]) * 255, 0, 255))

    # Display the images
    cv2.imwrite('./src/processImages/contrastEnh.png', stretched)
    
    return '/contrastEnh.png'
    
print (contrastEnhProcess())
