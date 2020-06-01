# coding: utf-8

from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_restplus import Api, Resource, fields
from apiAgro import Poligono
import json
import jwt
import time
import datetime
import hashlib, binascii, os
from functools import wraps




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
CORS(app,supports_credentials=True)

#AUTH

def autenticarUsuario(email):
    arquivo_query = 'QUERY_SELECT_USUARIOS.sql'

    with open('SQLS/'+str(arquivo_query),'r') as sql:  
        query = sql.read() 
    sql.close()

    query = query.replace('[email]',email)

    user = executarQuerySelect(query,arquivo_query)

    if not user:
        return 0

    return user

def gerarHashSenha(senha):
    #Retorna a senha em hash
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', senha.encode('utf-8'), salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')

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
@sentinel.route('/auth')
class Auth(Resource):
    @sentinel.expect(modelAuth)
    def post(self):
        user = sentinel.payload['user']

        dados_usuario = autenticarUsuario(user)

        if not dados_usuario:
            return {'erro':'Usuario ou senha incorretos!'},401

        if user and verificaSenha(dados_usuario[0][6],sentinel.payload['password']):
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



if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True,port=5000)