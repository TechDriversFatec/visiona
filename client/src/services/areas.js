import { banco } from './config_banco'

export default{
    retornarAreas:() => {
        return banco.get('getAreas')
    }
}