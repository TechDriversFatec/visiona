# coding: utf-8

from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_restplus import Api, Resource, fields
from apiAgro import Poligono
import json


app = Flask(__name__)
app.config.SWAGGER_UI_DOC_EXPANSION = 'list'
blueprint = Blueprint('api', __name__, url_prefix='/api')
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
CORS(app)

#MODELS

modelGeoJSON = api.model('GeoJSON',{'geojson': fields.Raw(required = True),'nome': fields.String(required = True)})
modelArea = api.model('Area',{'id': fields.String(required = True),'nome': fields.String(required = True)})

#PARSERS

parserExcluirArea = api.parser()
parserExcluirArea.add_argument("id", location = "params",required=True ,help = "ID do poligono")

parserInfoArea = api.parser()
parserInfoArea.add_argument("id", location = "params",required=True ,help = "ID do poligono")

parserCarregarArea = api.parser()
parserCarregarArea.add_argument("id", location = "params",required=True ,help = "ID do poligono")

@sentinel.route('/status', methods=['GET'])
class Status(Resource):
    def get(self):
        return {'sucesso':'Api funcionando!'},200

@area.route('/criar')
class criarArea(Resource):
    @area.expect(modelGeoJSON)
    def post(self):
        print(area.payload)
        geo = area.payload['geojson']['features'][0]['geometry']['coordinates']

        nome = area.payload['nome']

        poligono = Poligono(geo,nome,'')
        poligono.criar()

        return {'id':poligono.id}

@area.route('/carregar')
class carregarArea(Resource):
    @area.expect(parserCarregarArea)
    def post(self):
        id = request.args.get('id')
        poligono = Poligono('','',id)
        poligono.carregar()
        return {'id':poligono.id}

@area.route('/excluir')
class deletarArea(Resource):
    @area.expect(parserExcluirArea)
    def delete(self):
        id = request.args.get('id')

        try:
            poligono = Poligono('','',id)
            poligono.carregar()
            poligono.deletar()
            return 'Área excluida!',200
        except:
            return 'Área não existe!',200

@area.route('/editar')
class editarArea(Resource):
    @area.expect(modelArea)
    def post(self):
        id = area.payload['id']
        nome = area.payload['nome']

        try:
            poligono = Poligono('','',id)
            poligono.carregar()
            poligono.atualizar(nome)

            return 'Área atualizada!',200
        except:
            return 'Área não existe!',200

@area.route('/info')
class infoArea(Resource):
    @area.expect(parserInfoArea)
    def get(self):
        id = request.args.get('id')

        try:
            poligono = Poligono('','',id)
            poligono.carregar()

            return poligono.info(),200
        except:
            return 'Área não existe!',200

@area.route('/info-solo')
class infoAreaSolo(Resource):
    @area.expect(parserInfoArea)
    def get(self):
        id = request.args.get('id')

        try:
            poligono = Poligono('','',id)
            poligono.carregar()

            return poligono.infoSolo(),200
        except Exception as erro:
            print(str(erro))
            return 'Área não existe!',200



if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True,port=5000)