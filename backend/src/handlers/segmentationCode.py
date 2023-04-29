import cv2
import numpy as np
import argparse

# imagePath = './src/processImages/tumor.jpeg'
def segmentationProcess(imagePath):
    # Load the image
    img = cv2.imread(imagePath)

    # Convert the image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Perform thresholding to create a binary image
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)

    # Perform morphological operations to remove noise and fill holes in the image
    kernel = np.ones((3,3), np.uint8)
    opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=2)
    closing = cv2.morphologyEx(opening, cv2.MORPH_CLOSE, kernel, iterations=3)

    # Find contours in the image
    contours, _ = cv2.findContours(closing, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Create a mask for the segmented region
    mask = np.zeros(img.shape[:2], np.uint8)
    for cnt in contours:
        if cv2.contourArea(cnt) > 500:
            cv2.drawContours(mask, [cnt], 0, 255, -1)

    # Apply the mask to the original image
    result = cv2.bitwise_and(img, img, mask=mask)

    cv2.imwrite('./src/processImages/imageSegmentated.png', result)

    return 'imageSegmentated.png'

# print (segmentationProcess())

if __name__ == '__main__':
    # Define the command line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('--imagePath', type=str, help='The first parameter')

    # Parse the command line arguments
    args = parser.parse_args()

    # Call the function with the parsed parameters
    print(segmentationProcess(args.imagePath))
