# coding: utf-8
import requests
import shutil
import time;

def baixarImagemTalhao(url):
    response = requests.get(url=url, stream=True)

    timestamp = time.time()
    nome_arq = './treinamento/'+str(timestamp)+'.png'

    local_file = open(nome_arq, 'wb')

    response.raw.decode_content = True

    shutil.copyfileobj(response.raw, local_file)

    return response.cookies