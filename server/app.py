# coding: utf-8

from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_restplus import Api, Resource, fields
from users import *
from apiAgro import Poligono
import json
import jwt
import time
import datetime
import hashlib, binascii, os
from functools import wraps

# Processamento de imagens
import urllib.request
import cv2
import random
import numpy as np
import matplotlib.pyplot as plt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'CHAVESECRETAFATEC2020PI6SEMGR5'
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
CORS(app,supports_credentials=True)

#AUTH

def autenticarUsuario(email):
    user = User()
    user.carregarUsuario(email)

    if not user:
        return 0

    return user

def verificaSenha(hash_senha_banco, senha):
    #Verifica se a senha recebida é igual a senha do banco
    #Compara hash(senha no banco) com senha recebida

    salt = hash_senha_banco[:64]
    hash_senha_banco = hash_senha_banco[64:]
    hash_senha = hashlib.pbkdf2_hmac(
        'sha512', 
        senha.encode('utf-8'), 
        salt.encode('ascii'), 
        100000
    )
    hash_senha = binascii.hexlify(hash_senha).decode('ascii')
    return hash_senha == hash_senha_banco

#VALIDADOR DO TOKEN
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            token = request.headers.get('x-access-token')
        except:
            token = ''

        if not token:
            return {'erro':'Token sem tamanho!'},403
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return {'erro':'Token inválido!'}, 401
            
        return f(*args, **kwargs)
    return decorated

def retornarUsuario(token):
    data = jwt.decode(token, app.config['SECRET_KEY'])
    
    if 'user' in data:
        return data['user']

#MODELS

modelGeoJSON = api.model('GeoJSON',{'geojson': fields.Raw(required = True),'nome': fields.String(required = True)})
modelArea = api.model('Area',{'id': fields.String(required = True),'nome': fields.String(required = True)})
modelAuth = api.model('Autenticação',{'user': fields.String(),'password':fields.String()})
modelProc = api.model('Processamento',{'url': fields.String()})
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


#Rota de autenticação
@area.route('/auth')
class Auth(Resource):
    @area.expect(modelAuth)
    def post(self):
        user = area.payload['user']

        dados_usuario = autenticarUsuario(user)

        if not dados_usuario:
            return {'erro':'Usuario ou senha incorretos!'},401

        if user and verificaSenha(dados_usuario.password,area.payload['password']):
            token = jwt.encode({'user' : user, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=3600)}, app.config['SECRET_KEY'])
            return {'token' : token.decode('UTF-8')},200

        return {'erro':'Usuario ou senha incorretos!'},401


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

@area.route('/processimg', methods=['POST'])
class processarImagem(Resource):
    @area.expect(modelProc)
    def post(self):
        if area.payload:
            print(area.payload)
            url = area.payload["url"]

            resp = urllib.request.urlopen(url)
            imagem = np.asarray(bytearray(resp.read()), dtype="uint8")
            print(imagem)
            imagem = cv2.imdecode(imagem, cv2.IMREAD_COLOR)


            # arq = request.files["image"]
            # read the image
            image = cv2.imread(imagem)
            try:
                # convert it to grayscale
                gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

                # perform the canny edge detector to detect image edges
                edges = cv2.Canny(gray, threshold1=30, threshold2=100)

                # show the detected edges
                plt.imshow(edges, cmap="gray")
                plt.savefig(random.choice('fodase.png'))
                return { "status" : 1, "mensagem" : "Processado com sucesso!" }
            except Exception as err:
                return { "status" : 0, "mensagem" : "Erro ao processar imagem" }
        else:
            return { "status" : 0, "mensagem" : "Adicione um arquivo a ser enviado!" }

if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True,port=5000)