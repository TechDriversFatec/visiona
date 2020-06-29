import { http } from './config'

export default{
    autenticar:(login) => {
        return http.post('authenticate',login)
    },
    criarUsuario:(account) => {
        return http.post('users',account)
    },
}
