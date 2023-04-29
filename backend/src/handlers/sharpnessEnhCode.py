import cv2
import numpy as np
import argparse

def sharpnessEnhProcess(imagePath):

    # Load the image
    # img = cv2.imread('./src/processImages/tumor.jpeg')
    img = cv2.imread(imagePath)

    # Create a sharpening kernel
    kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])

    # Apply the sharpening kernel
    sharp = cv2.filter2D(img, -1, kernel)

    # Display the images
    cv2.imwrite('./src/processImages/sharpnessEnh.png', sharp)

    return 'sharpnessEnh.png'
    

if __name__ == '__main__':
    # Define the command line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('--imagePath', type=str, help='The first parameter')

    # Parse the command line arguments
    args = parser.parse_args()

    # Call the function with the parsed parameters
    print(sharpnessEnhProcess(args.imagePath))