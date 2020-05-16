from utilitarios import *

import requests
import json
import time
import datetime

import pyowm
from pyowm.utils.geo import Polygon as GeoPolygon

API_ID = '672d11784a3e70a0ac49c576f3c3d069'
owm = pyowm.OWM(API_ID)
api = owm.agro_manager()

class Poligono:

    def __init__(self,geojson,nome,id):
        self.geojson = geojson 
        self.nome = str(nome)
        self.id = id
        self.userid = None
        self.poligono_obj = None

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
            poligono = api.create_polygon(GeoPolygon(self.geojson), self.nome)
            self.id = poligono.id
            self.userid = poligono.user_id
            self.poligono_obj = poligono
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