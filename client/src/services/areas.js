import { http } from './config'
import store from '.././store';

export default{
    retornarAreas:(pagina) => {

        const headers = {
            'x_access_token': store.state.accessToken
        }
        const params = {
            page: pagina
        }
        return http.get('areas',{headers,params})
    },
    adicionarArea:(objetoArea) => {
        const headers = {
            'x_access_token': store.state.accessToken
        }
        return http.post('areas',objetoArea,{headers})
    }
}