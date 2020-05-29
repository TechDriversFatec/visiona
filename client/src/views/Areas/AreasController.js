import Card from '../../components/Card/Card.vue'
//Services
import Areas from '../../services/areas'

export default {
    components: {
      Card,

    },
    data () {
      return {
        arrayAreas: [],
        link : '',
      }
    },
    mounted () {

      // if (localStorage.getItem('data')){
      //   this.arrayAreas = JSON.parse(localStorage.getItem('data'));
      //   console.log(this.arrayAreas)
      // } else {
        Areas.retornarAreas().then(resposta =>{
          this.arrayAreas = resposta.data.areas;
          localStorage.setItem('data', JSON.stringify(resposta.data))
          console.log(this.arrayAreas)
        })
      // }
    },
    methods: {
      formatarNum(num){
        num = ("00" + num.toString()).slice(-3);
        return num
      },
      chamarPlayer(num){
        this.link = '/episodio/'+num.toString()
        this.$router.push(this.link)
      }
    },
  }
