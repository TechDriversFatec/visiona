
import urllib.request
import cv2
import random
import numpy as np
import matplotlib.pyplot as plt

from urllib.request import urlopen

def url_to_image(url, readFlag=cv2.IMREAD_COLOR):
    # download the image, convert it to a NumPy array, and then read
    # it into OpenCV format
    resp = urlopen(url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, readFlag)

    image = cv2.imread(image, cv2.IMREAD_UNCHANGED)

url_to_image('https://pbs.twimg.com/profile_images/590386692181352448/-F84l7Hz_400x400.jpg')