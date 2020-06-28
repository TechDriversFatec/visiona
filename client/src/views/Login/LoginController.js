import User from '../../services/users'

export default{
  data() {
    return {
      login: {
        email: null,
        password: null
      },
      loading: false
    }
  },
  methods: {
    auth(){
      this.loading = true
      User.autenticar(this.login).then(resposta => {
        localStorage.setItem('accessToken', resposta.data.token)
        localStorage.setItem('username', resposta.data.username)
        localStorage.setItem('email', resposta.data.email)
        this.loading = false
        if (resposta.data.token){
          this.$router.push('/webgis')
        } 
      })
    }
  }
}
