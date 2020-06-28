from utilitarios import *

import requests
import json
import time
import datetime

import pyowm
from pyowm.utils.geo import Polygon as GeoPolygon
API_KEYS = [
    '672d11784a3e70a0ac49c576f3c3d069',
    'cb32f6df01ff0567b92ead6813e10c9d',
    'c2cf2c493f6dfbea8f0494145ef533c7',
    'd8e29198b9c07f25974fec6fdc00575f',
    'd2a7159180c3df286499108f11730658'
]
API_ID = API_KEYS[3]
owm = pyowm.OWM(API_ID)
api = owm.agro_manager()

class Poligono:

    def __init__(self,geojson,nome,id):
        self.geojson = geojson 
        self.nome = str(nome)
        self.id = id
        self.userid = None
        self.poligono_obj = None
        self.array_imagens = None

    def carregar(self):
        try:
            self.poligono_obj = api.get_polygon(self.id)
            self.id = self.poligono_obj.id
            self.nome = self.poligono_obj.name
            self.userid = self.poligono_obj.user_id
            return 1
        except Exception as erro:
            print(str(erro))
            return 0

    def criar(self):
        try:
            area = GeoPolygon(self.geojson)
            poligono = api.create_polygon(area, self.nome)                    

            self.id = poligono.id
            self.userid = poligono.user_id
            self.poligono_obj = poligono


            url = "http://158.69.2.191:5500/add"

            self.retornarLinkImagens('01/01/2019','01/01/2020')
            
           
            payload = {
                "geojson":self.geojson,
                "name":self.nome,
                "payload": {
                    "imgs": self.array_imagens
                },
                "key": self.userid,
                "hash":API_ID
            }
            
            response = requests.request("POST", url, json=payload)
            print(response)
            return 1
        except Exception as erro:
            print(str(erro))
            return 0

    def deletar(self):
        try:
            api.delete_polygon(self.poligono_obj)
            return 1
        except Exception as erro:
            print(str(erro))
            return 0

    def atualizar(self,nome):
        try:
            self.poligono_obj.name = nome
            api.update_polygon(self.poligono_obj)
            return 1
        except Exception as erro:
            print(str(erro))
            return 0

    def info(self):
        return {'nome': self.nome,'id': self.id}

    def infoSolo(self):
        solo = api.soil_data(self.poligono_obj)

        dados = {
            'data':solo.reference_time(timeformat='unix'),
            'tempSolo':float(solo.surface_temp(unit='celsius')),
            'tempSolo10cm':float(solo.ten_cm_temp(unit='celsius')),
            'umidadeSolo':float(solo.moisture)
        }

        return dados

    def retornarLinkImagens(self,data_inicio,data_fim):
        
        array_produtos = []
        
        dt_inicio = time.mktime(datetime.datetime.strptime(data_inicio, "%d/%m/%Y").timetuple())
        dt_fim = time.mktime(datetime.datetime.strptime(data_fim, "%d/%m/%Y").timetuple())

        url = 'http://api.agromonitoring.com/agro/1.0/image/search'
        params = {
            "start": dt_inicio,
            "end": dt_fim,
            "polyid": self.id,
            "appid": API_ID
        }
        try:
            resp = requests.get(url=url,params=params)
            data = json.loads(resp.text)
        except Exception as erro:
            print(str(erro))

        for produto in data:
            if 'Sentinel-2' not in produto['type']:continue           
            array_produtos.append(produto['image']['truecolor'])

        self.array_imagens = array_produtos
        return 1

    def baixarImagens(self,data_inicio,data_fim):
        
        dt_inicio = time.mktime(datetime.datetime.strptime(data_inicio, "%d/%m/%Y").timetuple())
        dt_fim = time.mktime(datetime.datetime.strptime(data_fim, "%d/%m/%Y").timetuple())

        url = 'http://api.agromonitoring.com/agro/1.0/image/search'
        params = {
            "start": dt_inicio,
            "end": dt_fim,
            "polyid": self.id,
            "appid": API_ID
        }

        try:
            resp = requests.get(url=url,params=params)
            data = json.loads(resp.text)
        except Exception as erro:
            print(str(erro))


        for produto in data:
            if 'Sentinel-2' not in produto['type']:continue           
            baixarImagemTalhao(produto['image']['truecolor'])