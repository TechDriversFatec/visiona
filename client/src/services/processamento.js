import { processamento } from './config_processamento'

export default{
    criarArea:(poligono) => {
        return processamento.post('criar',poligono)
    }
}