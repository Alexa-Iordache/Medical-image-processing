import cv2
import numpy as np

def sharpnessEnhProcess():

    # Load the image
    img = cv2.imread('./src/processImages/tumor.jpeg')

    # Create a sharpening kernel
    kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])

    # Apply the sharpening kernel
    sharp = cv2.filter2D(img, -1, kernel)

    # Display the images
    cv2.imwrite('./src/processImages/sharpnessEnh.png', sharp)

    return '/sharpnessEnh.png'
    
print (sharpnessEnhProcess())