import cv2
import string
import random
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from utilitarios import *

def identificarTalhoes(url):

    caminho_img = baixarImagemPNG(url)
    image = cv2.imread(caminho_img,cv2.IMREAD_UNCHANGED)

    dimensions = image.shape

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)


    edges = cv2.Canny(gray, threshold1=30, threshold2=100)

    edges[edges != 0] = (255,0,0) # change everything to white where pixel is not black
    
    figure = plt.gcf()
    figure = plt.figure(frameon=False)

    ax = plt.Axes(figure, [0., 0., 1., 1.])
    ax.set_axis_off()
    figure.add_axes(ax)


    figure.set_size_inches(dimensions[1]/24, dimensions[0]/24)

    plt.imshow(edges, cmap="gray")
    plt.savefig('./talho.png',dpi=100)

identificarTalhoes('https://auracleremotesensing.files.wordpress.com/2014/09/coleambally.png')
