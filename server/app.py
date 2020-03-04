from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restplus import Api, Resource, fields
from apiCopernicus import baixarArea
import json


app = Flask(__name__)
CORS(app)
api = Api(app)

model_geojson = api.model('Area',{'area': fields.String(required = True)})
model_data = api.model('Data',{'data': fields.Date(required = True)})
sentinel = api.namespace('sentinel', description='Principais APIs')


@sentinel.route('/teste', methods=['GET'])
class Teste(Resource):
    def get(self):
        return {'sucesso':'Api funcionando!'},200

        
@sentinel.route('/processar', methods=['POST'])
class BaixarArea(Resource):
    @sentinel.expect(model_geojson)
    def post(self):
        area = sentinel.payload['area']

        try:
            with open('area.json', 'w', encoding='utf-8') as arquivo:
                json.dump(json.loads(area), arquivo, ensure_ascii=False, indent=4)
            arquivo.close()
        except:
            return {"erro":"Erro ao gerar geojson da área."}

        try:
            baixarArea()
        except:
            return {"erro":"Erro ao baixar área demarcada."}

        
        return {'sucesso':'teste'},200




if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True,port=5000)