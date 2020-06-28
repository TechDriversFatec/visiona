# coding: utf-8
import requests
import shutil
import time;

def baixarImagemTalhao(url):
    response = requests.get(url=url, stream=True)

    timestamp = time.time()
    nome_arq = './'+str(timestamp)+'.jp2'

    local_file = open(nome_arq, 'wb')

    response.raw.decode_content = True

    shutil.copyfileobj(response.raw, local_file)

    return response.cookies

def baixarImagemPNG(url):
    response = requests.get(url=url, stream=True)

    nome_arq = './imagem_processada.png'

    local_file = open(nome_arq, 'wb')

    response.raw.decode_content = True

    shutil.copyfileobj(response.raw, local_file)

    return nome_arq

def baixarImagemJPG(url):
    response = requests.get(url=url, stream=True)

    nome_arq = './imagem_processada.jpg'

    local_file = open(nome_arq, 'wb')

    response.raw.decode_content = True

    shutil.copyfileobj(response.raw, local_file)

    return nome_arq