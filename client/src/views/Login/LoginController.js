import User from '../../services/users'
import router from "../../router";

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
    onClickOutside () {
        this.active = false
      },
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
    },
    create(){
          this.loading = false
          router.push('/signin')
    }
  }
}
