import cv2
import numpy as np
import argparse

def brightnessEnhProcess(imagePath, brightnessValue, contrastValue):

    # Load the image
    # img = cv2.imread('./src/processImages/tumor.jpeg')
    img = cv2.imread(imagePath)

    # Define the brightness and contrast values
    # brightness = 50
    # contrast = 1.5
    brightness = brightnessValue
    contrast = contrastValue

    # Apply brightness and contrast adjustments
    adjusted = np.int16(img)
    adjusted = adjusted * contrast + brightness
    adjusted = np.clip(adjusted, 0, 255)
    adjusted = np.uint8(adjusted)

    cv2.imwrite('./src/processImages/brightnessEnh.png', adjusted)
    # print('./src/processImages/brightnessEnh.png')

    return '/brightnessEnh.png'
    
# print (brightnessEnhProcess())

if __name__ == '__main__':
    # Define the command line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('--imagePath', type=str, help='The first parameter')
    parser.add_argument('--brightness', type=int, help='The first parameter')
    parser.add_argument('--contrast', type=float, help='The first parameter')

    # Parse the command line arguments
    args = parser.parse_args()

    # Call the function with the parsed parameters
    print(brightnessEnhProcess(args.imagePath, args.brightness, args.contrast))