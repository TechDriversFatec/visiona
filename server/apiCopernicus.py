from sentinelsat import SentinelAPI, read_geojson, geojson_to_wkt
import pandas


def baixarArea():
    sentinel2 = SentinelAPI(
        user="douglassouzag",
        password="ninjas3860",
        api_url="https://scihub.copernicus.eu/apihub/"
    )

    products = sentinel2.query(
        area = geojson_to_wkt(read_geojson('area.json')),
        #area = geojson_to_wkt(geojson),
        date = ('20190101','20190201'),
        platformname = "Sentinel-2",
        cloudcoverpercentage=(0,40),
    )

    lista_produtos = sentinel2.to_dataframe(products)
    # print(type(lista_produtos))
    print(lista_produtos)
    for index,produto in lista_produtos.iterrows():
        # print(sentinel2.get_product_odata(produto['uuid']))
        sentinel2.download(str(produto['uuid']))
        break
    # sentinel2.download_all(products)

