import Processamento from '../../services/processamento'

export default{
  data() {
    return {
      login: {
        user: null,
        password: null
      }
    }
  },
  methods: {
    auth(){
      Processamento.autenticar(this.login).then(resposta => {
        localStorage.setItem('accessToken', JSON.stringify(resposta.data.token))
        if (resposta.data.token){
          this.$router.push('/webgis')

        } 
      })
    }
  }
}
