import { imgur } from './configImgur'

export default{
    uploadImagem:(buffer) => {
        const options = {params: {image:buffer},headers: {'Authorization':'Bearer ed22cda1c74f4418c27e55e8767a297133b007be'}}
        

        console.log(options)
        return imgur.post('image',options)
    },
}