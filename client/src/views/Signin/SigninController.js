import User from '../../services/users'
import router from "../../router"

export default{
  data() {
    return {
      account: {
        email: null,
        password: null,
        username: null
      },
      loading: false
    }
  },
  methods: {
    create(){
      this.loading = true
      User.criarUsuario(this.account).then(resposta => {
      console.log(resposta);
      this.loading = false
      router.push('/login')
      })
    }
  }
}
