# coding: utf-8

from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_restplus import Api, Resource, fields
from apiCopernicus import baixarArea
from apiAgro import Poligono
import json


app = Flask(__name__)
app.config.SWAGGER_UI_DOC_EXPANSION = 'list'
blueprint = Blueprint('api', __name__, url_prefix='/api')
CORS(app)
api = Api(
    blueprint,
    doc='/doc/',
    version = "1.0", 
	title = "Visiona", 
	description = "Descrição aqui"
)
app.register_blueprint(blueprint)

sentinel = api.namespace('sentinel', description='Rotas principais')
area = api.namespace('area', description='Áreas')


@sentinel.route('/status', methods=['GET'])
class Status(Resource):
    def get(self):
        return {'sucesso':'Api funcionando!'},200

@area.route('/criar')
class criarArea(Resource):
    @area.expect(
        api.model('GeoJSON',{'geo_json': fields.Raw(required = True),'name': fields.String(required = True)})
    )
    def post(self):
        geo = area.payload['geo_json']['geo_json']['geometry']['coordinates']
        nome = area.payload['name']

        poligono = Poligono(geo,nome,'')
        poligono.criar()
        return {'id':poligono.id}

@area.route('/excluir')
class deletarArea(Resource):
    @area.expect(
        api.model('Area',{'id': fields.String(required = True)})
    )
    def delete(self):
        id = area.payload['id']

        try:
            poligono = Poligono('','',id)
            poligono.carregar()
            poligono.deletar()
            return 'Área excluida!',200
        except:
            return 'Área não existe!',200

if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True,port=5000)