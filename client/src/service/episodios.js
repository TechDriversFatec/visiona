import { http } from './config'

export default{
    listar:() => {
        return http.get('episodios')
    },
    pegarDadosEp:(num) => {
        return http.get('episodio/'+num.toString())
    }
}