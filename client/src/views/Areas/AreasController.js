import Episodios from '../../service/episodios'
import Card from '../../components/Card/Card.vue'
// import Episodio from '../../components/Episodio/Episodio.vue'

export default {
    components: {
      Card,

    },
    data () {
      return {
        arrayEpisodios: [],
        link : '',
      }
    },
    mounted () {

      if (localStorage.getItem('data')){
        this.arrayEpisodios = JSON.parse(localStorage.getItem('data'));
      } else {
        Episodios.listar().then(resposta =>{
          this.arrayEpisodios = resposta.data;
          localStorage.setItem('data', JSON.stringify(resposta.data))
        })
      }
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
