from sentinelsat import SentinelAPI, read_geojson, geojson_to_wkt
from shapely.geometry import MultiPolygon, Polygon
import shapely
import pyproj
from zipfile import ZipFile
import pandas
import fiona
import geopandas
import rasterio
from rasterio.mask import mask
import os

#Variaveis globais:
USER = 'douglassouzag'
PASSWORD = 'ninjas3860'
API_URL = 'https://scihub.copernicus.eu/apihub/'
SENTINEL = SentinelAPI(user=USER,password=PASSWORD,api_url=API_URL)

class Poligono:

    def __init__(self,geojson,shapefile,nome,id):
        self.geojson = geojson
        self.shapefile = shapefile
        self.nome = str(nome)
        self.id = id

def carregarProdutos():
    
    shapefile = geopandas.read_file('POLYGON.shp') #Shapefile criada pelo front
    area = geojson_to_wkt(read_geojson('area.json')) #GeoJSON criado pelo front
    #Criando footprint a partir da shapefile
    footprint = None
    for i in shapefile['geometry']:
        footprint = i

    #Usando footprint para listar todos os produtos
    produtos = SENTINEL.query(
        footprint,
        date = ('20190601', '20190626'),
        platformname = 'Sentinel-2',
        processinglevel = 'Level-2A',
        cloudcoverpercentage = (0,10)
    )


    produtos_gdf = SENTINEL.to_geodataframe(produtos)
    produtos_gdf_sorted = produtos_gdf.sort_values(['cloudcoverpercentage'], ascending=[True])
    
    #Fazendo o download do produto com a menor percentagem de nuvens
    for index,produto in produtos_gdf_sorted.iterrows():
        nome_produto = produto['title']
        id_produto = index
        SENTINEL.download(id_produto)    
        break

    # Criando Objeto ZipFile e extraindo no diretorio raiz
    with ZipFile(nome_produto+'.zip', 'r') as zipObj:
        zipObj.extractall()

    dir_produto = nome_produto + '.SAFE/GRANULE/'

    #Listando subpastas 
    nome_dir_bandas = os.listdir(dir_produto) 

    dir_bandas = dir_produto + str(nome_dir_bandas[0]) + '/IMG_DATA/R10m/'

    #Listando bandas disponiveis
    bandas = os.listdir(dir_bandas)

    bdn = bandas[0].split('_')
    # Abrindo Bandas 4, 3 e 2 com Rasterio
    b4 = rasterio.open(dir_bandas+bdn[0]+'_'+bdn[1]+'_B04_10m.jp2')
    b3 = rasterio.open(dir_bandas+bdn[0]+'_'+bdn[1]+'_B03_10m.jp2')
    b2 = rasterio.open(dir_bandas+bdn[0]+'_'+bdn[1]+'_B02_10m.jp2')

    with rasterio.open('RGB.tiff','w',driver='Gtiff', width=b4.width, height=b4.height,count=3,crs=b4.crs,transform=b4.transform, dtype=b4.dtypes[0]) as rgb:
        rgb.write(b2.read(1),1) 
        rgb.write(b3.read(1),2) 
        rgb.write(b4.read(1),3) 
        rgb.close()
    return 1
    mascara = shapefile.to_crs({'init': 'epsg:32633'})

    with rasterio.open("RGB.tiff") as src:
        out_image, out_transform = rasterio.mask.mask(src, mascara.geometry,crop=True)
        out_meta = src.meta.copy()
        out_meta.update({"driver": "GTiff",
                    "height": out_image.shape[1],
                    "width": out_image.shape[2],
                    "transform": out_transform})
        
    with rasterio.open("RGB_masked.tif", "w", **out_meta) as dest:
        dest.write(out_image)

carregarProdutos()