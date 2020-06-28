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

baixarImagemTalhao('https://sentinel-s2-l1c.s3.amazonaws.com/tiles/12/S/WJ/2020/6/21/0/TKI.jp2')