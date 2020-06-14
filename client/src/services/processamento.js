import { processamento } from './config_processamento'

export default{
    autenticar:(login) => {
        return processamento.post('auth',login)
    },
    criarArea:(poligono) => {
        return processamento.post('criar',poligono)
    }
}