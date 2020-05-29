import { banco } from './config_banco'

export default{
    retornarAreas:() => {
        return banco.get('getAreas')
    },
    pegarDadosEp:(num) => {
        return banco.get('episodio/'+num.toString())
    }
}