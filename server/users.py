import requests
import hashlib, binascii, os
BASE_URL = 'http://158.69.2.191:5500/'
class User:
    def __init__(self):
        self.id = None 
        self.nome = None
        self.email = None
        self.password = None

    def criarUsuario(self,nome,email,password):
        url = BASE_URL + "createUser"
    
        
        data = {
            "nome": nome,
            "email":email,
            "password":password
        }
        
        response = requests.request("POST", url, json=data)
        data = response.json()
    
        return data

    def carregarUsuario(self,email):
        url = BASE_URL + "getUsersByEmail"
    
        
        data = {
            "email":email
        }
        
        response = requests.request("POST", url, json=data)
        data = response.json()
        
        self.id = data['users'][0]['id']
        self.nome = data['users'][0]['nome']
        self.email = data['users'][0]['email']
        self.password = data['users'][0]['password']

        return self.id

    def atualizarUsuario(self,nome,email):
        url = BASE_URL + "upUser"
    
        
        data = {
            "nome":nome,
            "email":email,
        }
        params = {
            "userID": self.id
        }

        response = requests.request("PATCH", url, json=data,params=params)
        data = response.json()

        return data

    def deletarUsuario(self):
        url = BASE_URL + "delUser"
    
        
        params = {
            "userID":self.id
        }
        
        response = requests.request("DELETE", url, params=params)
        data = response.json()

        return data

def gerarHashSenha(senha):
    #Retorna a senha em hash
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', senha.encode('utf-8'), salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')

        